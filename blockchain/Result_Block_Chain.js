var abiCode =require ('../blockchain/build/contracts/Student.json') ;
var Web3 = require('web3');

var web3 = new Web3.Web3("http://127.0.0.1:7545");

 const DBAdminAccount = '0x1CD284CF88685B30Ecd1724003931Ac97Cda75c2';

const contractABI = abiCode.abi;
const contractAddress = "0x4CAF467Bd29e650fae4C4f4FCdeE7cb3A10d6EBc"

const srContract = new web3.eth.Contract(contractABI,contractAddress);
async function AddResult(rollNo,semester,resHash) {
  try {
      console.log("adding student data")
      const studentData = await srContract.methods.addResult(rollNo, semester, resHash).send({from: DBAdminAccount,gas : 1000000})
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
