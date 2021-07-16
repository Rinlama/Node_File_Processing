const fs = require("fs");
const readline = require("readline");

const os = require("os");

const readFileLocation = "./Prop.txt";
const writeFileLocation = "./Answer.txt";

const readProp = () => {
  fs.writeFileSync(writeFileLocation, "");
  const text = fs.createReadStream(readFileLocation);
  const rl = readline.createInterface({
    input: text,
  });
  let counter = 0;
  rl.on("line", (res) => {
    if (counter != 0) {
      const resList = res.split("|");
      const priceSold = resList[8].replace(/[$,]+/g, "").replace(/['"]+/g, "");
      const totalCost = resList[7].replace(/[$,]+/g, "").replace(/['"]+/g, "");
      const netIncome = priceSold - totalCost;
      const netIncomeDollar = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(netIncome);
      const secondlastPipe = res.lastIndexOf("|") - 1;
      const answer = `${res.substring(
        0,
        secondlastPipe
      )} | ${netIncomeDollar} |`;
      writeAnswer(answer + os.EOL);
    }

    if (counter === 0) {
      writeAnswer(res + os.EOL);
    }

    counter++;
  });
};
readProp();

const writeAnswer = (data) => {
  fs.appendFile(writeFileLocation, data, "Utf-8", (err) => {
    if (err) console.error(err);
  });
};
