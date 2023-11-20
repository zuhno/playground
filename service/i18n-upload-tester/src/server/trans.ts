import i18nConfig from "../../i18n-config.json";
import awsConfig from "../../aws-config.json";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { readFile, writeFile, access, mkdir } from "fs/promises";
import path from "path";
import AWS from "aws-sdk";

AWS.config.update(awsConfig);

const s3 = new AWS.S3();
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_HASH_ID);

const FILE_PATH = "static/trans-hash.json";

async function writeHashFile(hash: string) {
  access(path.resolve(__dirname, "../../static"))
    .catch(() => {
      mkdir(path.resolve(__dirname, "../../static"));
    })
    .finally(() => {
      writeFile(FILE_PATH, JSON.stringify({ hash }, null, "\t"));
    });
}

async function readLocalHash() {
  return readFile(FILE_PATH, {
    encoding: "utf-8",
  })
    .then((file) => {
      const hash = JSON.parse(file)?.hash;
      return hash;
    })
    .catch(() => {
      return;
    });
}

async function readSheetHash() {
  const versionSheet = doc.sheetsByTitle["version"];
  await versionSheet.loadCells();

  return versionSheet.getCell(0, 0).value as string;
}

async function versionCheck() {
  const hashFromSheet = await readSheetHash();
  const hashFromLocal = await readLocalHash();

  if (hashFromLocal === hashFromSheet) {
    console.log("Translate Hash Not Changed!");
    return false;
  }

  await writeHashFile(hashFromSheet);
  return true;
}

export async function transUploader() {
  await doc.useServiceAccountAuth(i18nConfig);
  await doc.loadInfo();

  if (!(await versionCheck())) return;

  const sheet = doc.sheetsByTitle["testtest"];
  await sheet.loadHeaderRow();
  const [key, ...translates] = sheet.headerValues;

  const rows = await sheet.getRows();

  for await (const translate of translates) {
    const result = rows.reduce((acc, row) => {
      acc[row[key]] = row[translate];
      return acc;
    }, {});

    // 시트 해시키 다르면 S3 업로드
    s3.upload(
      {
        Bucket: "dev-static.infinitytower.games",
        Key: `etc/translates/${translate}/translation.json`,
        Body: Buffer.from(JSON.stringify(result, null, "\t")),
        ContentEncoding: "utf-8",
      },
      function (err, data) {
        if (err) {
          console.log("s3 err : ", err);
        } else {
          console.log(translate, " successful");
        }
      }
    );
  }
}
