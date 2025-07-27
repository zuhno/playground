function isGacha(n) {
  return Math.random() < n / 100;
}

function check(nn, total) {
  let success = 0;
  let fail = 0;

  for (let i = 0; i < total; i++) {
    if (isGacha(nn)) {
      success++;
    } else {
      fail++;
    }
  }

  console.log("total : ", total);
  console.log("success : ", success);
  console.log("fail : ", fail);

  if ((success / total) * 100 < nn + 1 && (success / total) * 100 > nn - 1) {
    console.log("test success! : ", (success / total) * 100, "%");
  }
}

// 22%, 100000회
check(22, 100000);
console.log("=================");
check(22, 10000000);
console.log("=================");
check(22, 123312312);
console.log("=================");
check(22, 100);
console.log("=================");
check(22, 332);
