import web3 from "./web3";
import Product from "./build/Automobile_Sale.json";
import address from "./address/address.json";

export default new web3.eth.Contract(
  JSON.parse(Product.interface),
  address["address"]
  // deployed acontract's address as a string variable
);
