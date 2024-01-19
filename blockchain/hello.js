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
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "students",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rollNo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "section",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "year",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "branch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hod",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "semester",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "grade",
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
        "name": "_rollNo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_section",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_year",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_branch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hod",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_semester",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_grade",
        "type": "string"
      }
    ],
    "name": "addStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rollNo",
        "type": "uint256"
      }
    ],
    "name": "getStudent",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "rollNo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "section",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "year",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "branch",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hod",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "semester",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "grade",
            "type": "string"
          }
        ],
        "internalType": "struct Student.Studentstruc",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]; // Paste your contract's ABI here
const contractAddress = "0xD600E06eFBFA6BbbAf677bE00C9982E392198487"
 // Replace with your contract's address
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
const rollNo = 12345;
const name = 'John Doe';
const section = 'A';
const year = 2023;
const branch = 'Computer Science';
const hod = 'Dr. Smith';
const semester = 3;
const grade = 'A';

//gas estimation
// contractInstance.methods.addStudent(  rollNo,
//   name,
//   section,
//   year,
//   branch,
//   hod,
//   semester,
//   grade).estimateGas({from: '0x72d135BC73100613fF86f5AAbE30CCA624D84C13'})
// .then(function(gasAmount){
//     console.log("gas estimated is "+gasAmount);
// })
// .catch(function(error){
    
// });

async function addStudent() {
  try {
      const rollNo = 12345;
      const name = 'John Doe';
      const section = 'A';
      const year = 2023;
      const branch = 'Computer Science';
      const hod = 'Dr. Smith';
      const semester = 3;
      const grade = 'A';

      const transaction = await contractInstance.methods.addStudent(
          rollNo,
          name,
          section,
          year,
          branch,
          hod,
          semester,
          grade
      ).send({ from: '0x72d135BC73100613fF86f5AAbE30CCA624D84C13', gas: '1000000'});

      console.log('Transaction hash:', transaction.transactionHash);
      console.log('Student added successfully!');
  } catch (error) {
      console.error('Error adding student:', error);
  }
}

// Retrieve student data
async function getStudent(rollNo) {
  try {
      const studentData = await contractInstance.methods.getStudent(rollNo).call();
      console.log('Student Data:', studentData);
  } catch (error) {
      console.error('Error retrieving student:', error);
  }
}

// Example usage
//addStudent();
getStudent(12345);