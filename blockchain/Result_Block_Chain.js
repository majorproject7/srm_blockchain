var Web3 = require('web3');

var web3 = new Web3.Web3("http://127.0.0.1:7545");
// ikkada mi ganache lo fake account untayi
// kada dantlo first kakunda
 //inkedina index account number pettandi
 const account1 = '0x18Af5D1e9E5931E03E30A6eB29a7A58dE4F8EAD1'
// const account2 = '0x18FC0D0ab797b4f9985AD10DF446b5Dd5A6ED6F6'
// for (var i =0;i<5;i++)
// { web3.eth.sendTransaction({
//   from: account1,
//   to: account2,
//   value: web3.utils.toWei('1','ether')
// })
// console.log(i+"--transaction done");
// }
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "rollNo",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "resHash",
        "type": "string"
      }
    ],
    "name": "ResultAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "studentResults",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "resHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "rollNo",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "resHash",
        "type": "string"
      }
    ],
    "name": "addResult",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "rollNo",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      }
    ],
    "name": "getResultBySemester",
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
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "rollNo",
        "type": "string"
      }
    ],
    "name": "getAllResults",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "semester",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "resHash",
            "type": "string"
          }
        ],
        "internalType": "struct Student.Result[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]; // Paste your contract's ABI here
//ikkada ganache lo contracts lo chuste 
const contractAddress = "0xF3E01b666F9B9FeAD67ccd09f6fd5B61edb0F7a7"

const srContract = new web3.eth.Contract(contractABI,contractAddress);
async function AddResult(rollNo,semester,resHash) {
  try {

      const studentData = await srContract.methods.addResult(rollNo, semester, resHash).send({from: account1,gas : 1000000})
      console.log('Student Data:', studentData);
      return studentData.transactionHash;
  } catch (error) {
      console.error('Error retrieving student:', error);
      return error;
  }
}

 async function getresult(rollno,sem)
{ try{
 const response =  await srContract.methods.getResultBySemester(rollno, sem).call()
 console.log(response);    
 return response;}
 catch(error)
 {
  return error;
 }
}
async function getAllResult(rollno)
{
  const response = await srContract.methods.getAllResults(rollno).call();
  //console.log("respone from chain ",response);
 
  return response;
}


// Example usage
//addStudent();
//AddResult(1,1,"ASDFsdfsdfs");
//getAllResult(12);
module.exports = {getresult,AddResult,getAllResult};
