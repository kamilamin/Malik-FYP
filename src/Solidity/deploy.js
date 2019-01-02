const product = require("./build/Automobile_Sale.json");
const fs = require("fs-extra");
const path = require("path"); // path module
const addressPath = path.resolve(__dirname, "address");
const web3 = require("./web3");

const deploy = async () => {
  try {
    const account = (await web3.eth.getAccounts())[1];
    console.log("Attempting to deploy from account", account);

    const result = await new web3.eth.Contract(JSON.parse(product.interface))
      .deploy({
        data: "0x" + product.bytecode,
        arguments: ["Malik & Tahir", "Karachi"]
      })
      .send({ gas: "3000000", from: account })
      .catch(console.log);

    console.log("Contract deployed to", result.options.address);

    // fs.removeSync(addressPath); // deletes the old folder.
    fs.ensureDirSync(addressPath); // creates the folder if not present.
    fs.outputJsonSync(addressPath + "/address.json", {
      address: result.options.address
    });
  } catch (err) {
    console.log(err);
  }
};
deploy();
