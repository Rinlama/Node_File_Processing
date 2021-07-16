const fs = require("fs");

const readline = require("readline");
const os = require("os");

const fileStream = fs.createReadStream("./Prop.txt");

function calculate() {
  fs.writeFile("./answer.txt", "", () => {
    console.log("Empty file .....");
  });
  const rl = readline.createInterface({
    input: fileStream,
  });
  let counter = 0;
  rl.on("line", (res) => {
    if (counter != 0) {
      const eachline = res.split("|");
      var totalcost = eachline[7].replace(/[$,]+/g, "").replace(/['"]+/g, "");
      var pricesold = eachline[8].replace(/[$,]+/g, "").replace(/['"]+/g, "");
      const netIncome = parseFloat(pricesold) - parseFloat(totalcost);
      const curr = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(netIncome);

      const secondlastIndexOf = res.lastIndexOf("|") - 1;

      const answer = `${res.substring(0, secondlastIndexOf)} | ${curr} | ${
        os.EOL
      }`;
      appendText(answer)
        .then((d) => {
          console.log(d);
        })
        .catch((error) => {
          console.error(err);
        });
    }
    if (counter === 0) {
      appendText(res + os.EOL)
        .then((d) => {
          console.log(d);
        })
        .catch((error) => {
          console.error(err);
        });
    }

    counter++;
  });
}

const appendText = (data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile("./answer.txt", data, "utf8", (err) => {
      resolve("added file ");
      if (err) reject(err);
    });
  });
};

calculate();
