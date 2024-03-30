var Web3 = require('web3');

var web3 = new Web3.Web3("http://127.0.0.1:7545");

 const account1 = '0xACea4a9336bc12f33066344E02B1d7aFdF95f0D3'

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
]; 

const contractAddress = "0x1D273a6453221671C0bE43f932F85Da06b99fb0E"

const srContract = new web3.eth.Contract(contractABI,contractAddress);
async function AddResult(rollNo,semester,resHash) {
  try {
      console.log("adding student data")
      const studentData = await srContract.methods.addResult(rollNo, semester, resHash).send({from: account1,gas : 1000000})
      console.log('Student Data:', studentData);
      return studentData.transactionHash;
  } catch (error) {
      console.error('Error retrieving student Data :', error);
      return error;
  }
}

 async function getresult(rollno,sem,rescount)
{ try{
  const resNo = BigInt(rescount);
  console.log(resNo);
 const response =  await srContract.methods.getResultBySemester(rollno, sem,resNo).call()
 console.log(response);    
 return response;}
 catch(error)
 {
  console.log(error);
  return error;
 }
}
async function getAllResult(rollno)
{
  const response = await srContract.methods.getAllResults(rollno).call();

 
  return response;
}



module.exports = {getresult,AddResult,getAllResult};
