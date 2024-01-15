var Web3 = require('web3');

var web3 = new Web3.Web3("http://127.0.0.1:7545");
// this code is for testing the ganache change the account1 and account2 to test ganache
// const account1 = '0xe66ED38e74C2c3AE05F9b913405a57471d04E582'
// const account2 = '0x18FC0D0ab797b4f9985AD10DF446b5Dd5A6ED6F6'
// for (var i =0;i<5;i++)
// { web3.eth.sendTransaction({
//   from: account1,
//   to: account2,
//   value: web3.utils.toWei('1','ether')
// })
// console.log(i+"--transaction done");
// }
const contractABI = [{
  "inputs": [],
  "name": "get",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
}]; // Paste your contract's ABI here
const contractAddress = "0x60A1a7859fe372E65d5FD42b8cd98fEdDB819321"
 // Replace with your contract's address
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

 async function greet()
 { const result = await contractInstance.methods.get().call();
console.log(result); 
}// Output: "hello from sol"
greet();
console.log("money transfered from onwe account to another");