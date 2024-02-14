var Web3 = require('web3');

var web3 = new Web3.Web3("http://127.0.0.1:7545");
// this code is for testing the ganache change the account1 and account2 to test ganache
 const account1 = '0xd0C37d2f7DF0c78E55bc88090568b00FBd3e2514'
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
        "internalType": "uint256",
        "name": "rollNo",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "rollNo",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "rollNo",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "rollNo",
        "type": "uint256"
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
const contractAddress = "0x833f4dce6eA781e397BeEE2614953D08Af09CBCc"

const srContract = new web3.eth.Contract(contractABI,contractAddress);
async function AddResult(rollNo,semester,resHash) {
  try {
//     const rollNo = 12;
// const semester = 2;
// const resHash = "0x1234567890abcdef";

      const studentData = await srContract.methods.addResult(rollNo, semester, resHash).send({from: account1,gas : 1000000})
      console.log('Student Data:', studentData);
  } catch (error) {
      console.error('Error retrieving student:', error);
  }
}

async function getresult(rollno,sem)
{
  srContract.methods.getResultBySemester(rollno, sem).call()
  .then(resultHash => {
    console.log("Result for semester", sem, ":", resultHash);
  })
  .catch(error => {
    console.error("Error getting result:", error);
  });
}
async function getAllResult(rollno)
{
  srContract.methods.getAllResults(rollno).call()
  .then(resultHash => {
    console.log("Result for semester", resultHash);
  })
  .catch(error => {
    console.error("Error getting result:", error);
  });
}
// getresult(12,2)

// Example usage
//addStudent();
//AddResult(12,1,"ASDFsdfsdfs");
getAllResult(12);
