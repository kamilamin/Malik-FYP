const path = require("path"); // path module
const solc = require("solc"); // solc module
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const productPath = path.resolve(__dirname, "contract", "Automobile_Sale.sol");

const source = fs.readFileSync(productPath, "utf8");

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
