npm start script is mentioned in package.json file.

for backend code us nodemon server.js for development purpose.

mongodb in localhost will connect to ipv6 generally to over come that use 127.0.0.1

git remote add origin https://github.com/majorproject7/srm_blockchain.git
git branch -M main
git push -u origin main



truffle compiler version should be 0.8.19
then ganache and truffle will correctly.


contract address is found in migration details or ganache details in transaction.
contract abi is found in artifacts or build/contracts :
 in json format.


 const contractAddress = await deployer.deployedContracts.YourContractName.address;
console.log("Contract address:", contractAddress);

this line is used to call the contract and get the value.

