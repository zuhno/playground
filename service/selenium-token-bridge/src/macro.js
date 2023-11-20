// const { Builder } = require("selenium-webdriver");
const realPuppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const chrome = require("selenium-webdriver/chrome");
// require("chromedriver");
const Web3 = require("web3");
const { toWei, fromWei } = require("web3-utils");
const BN = require("bignumber.js");
require("dotenv").config();

const fncyWeb3 = new Web3(process.env.FNCY_RPC_URL);
const bnbWeb3 = new Web3(process.env.BNB_RPC_URL);

const FOUNDATION_ADDRESS = process.env.FOUNDATION_ADDRESS;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getBalance(address, type) {
  if (type === "fncy") {
    return fncyWeb3.eth.getBalance(address);
  }
  return bnbWeb3.eth.getBalance(address);
}

async function swapMacroExecutor(_value, _toAddress) {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
    ignoreHTTPSErrors: true,
    executablePath: realPuppeteer.executablePath(),
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9,hy;q=0.8",
  });
  await page.setViewport({ width: 1920, height: 1080 });

  page.on("response", async (response) => {
    const request = response.request();
    if (
      request.url() === "https://apis.cubeapi.io/v1/users/rsa-public" &&
      request.method() === "GET"
    ) {
      console.log("#INTERCEPT Response:", await response.json());
    }
  });

  try {
    await page.goto("https://fncy.world/defi/bridge/fncybridge");

    await sleep(3000);

    const loginPopupPage = new Promise((res) => page.once("popup", res));
    await page.waitForSelector(".profile");
    await page.click(".profile");

    const loginPage = await loginPopupPage;

    await loginPage.waitForSelector(".google");
    await loginPage.click(".google");

    await sleep(1500);

    await loginPage.type("#identifierId", process.env.FOUNDATION_GOOGLE_EMAIL);
    await loginPage.keyboard.press("Enter");

    await sleep(2500);

    await loginPage.type(
      "#password input[type='password']",
      process.env.FOUNDATION_GOOGLE_PASSWORD
    );
    await loginPage.keyboard.press("Enter");

    await sleep(10000);

    if (!loginPage.isClosed()) {
      await loginPage.waitForSelector(".google");
      await loginPage.click(".google");
    }
    await sleep(5000);

    const cachedNativeBalance = await getBalance(FOUNDATION_ADDRESS, "fncy");

    await page.waitForSelector(".swap-inputBox-input #from");
    await page.type(".swap-inputBox-input #from", _value);

    await sleep(2000);

    await page.waitForSelector("button .text-area");
    await page.click("button .text-area");

    await sleep(2000);

    await page.waitForSelector(
      ".fncy-modal-content .input-area[type='password']"
    );
    await page.type(
      ".fncy-modal-content .input-area[type='password']",
      process.env.FOUNDATION_WALLET_PASSWORD
    );

    await page.waitForSelector(".fncy-modal-content button .text-area");
    await page.$eval(".fncy-modal-content button .text-area", (el) =>
      el.click()
    );

    await new Promise((r, j) => {
      const intervalId = setInterval(async () => {
        const currentNativeBalance = await getBalance(
          FOUNDATION_ADDRESS,
          "fncy"
        );
        if (new BN(currentNativeBalance).gt(cachedNativeBalance)) {
          const bnbBalance = await getBalance(FOUNDATION_ADDRESS, "bsc");
          clearInterval(intervalId);
          console.log("Send Token Quantity(ETHER):", _value);
          console.log(
            "Changed Balance(ETHER):",
            fromWei(cachedNativeBalance),
            "->",
            fromWei(currentNativeBalance)
          );
          console.log("Remained BNB Balance(ETHER):", fromWei(bnbBalance));
          console.log("Swap Complete!");

          try {
            fncyWeb3.eth.accounts.wallet.add(process.env.SAMPLE_PRIVATE_KEY);
            const { rawTransaction } =
              await fncyWeb3.eth.accounts.signTransaction(
                {
                  to: _toAddress,
                  value: toWei(
                    new BN(_value).dividedBy(10).multipliedBy(9).toString()
                  ),
                  gas: 2000000,
                },
                process.env.SAMPLE_PRIVATE_KEY
              );
            await fncyWeb3.eth.sendSignedTransaction(rawTransaction);

            r(true);
          } catch (error) {
            j(error?.message);
          }
        }
      }, 1000);
    });

    browser.close();
    return true;
  } catch (error) {
    console.log(error);
    browser.close();
    return false;
  }
}

exports.swapMacroExecutor = swapMacroExecutor;
