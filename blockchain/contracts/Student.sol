// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.5.0 <0.9.0;


contract Student {
    // Structure to represent a single result object
    struct Result {
        uint256 semester;
        string resHash;
    }

    // Mapping to store student results based on their roll number
    mapping(string => Result[]) public studentResults;

    // Event emitted when a student's result is added
    event ResultAdded(string rollNo, uint256 semester, string resHash);

    // Function to add a result for a student
    function addResult(string memory rollNo, uint256 semester, string memory resHash) public {
       require(semester > 0, "Semester must be greater than 0"); // Validate semester

        // Ensure uniqueness of semester results for a student
        // bool unique = true;
        // for (uint256 i = 0; i < studentResults[rollNo].length; i++) {
        //     if (studentResults[rollNo][i].semester == semester) {
        //         unique = false;
        //         break;
        //     }
        // }

        // require(unique, "Duplicate result for the same semester");

        studentResults[rollNo].push(Result(semester, resHash));
        emit ResultAdded(rollNo, semester, resHash);
    }

    // Function to get a student's result for a specific semester
    function getResultBySemester(string memory rollNo, uint256 semester) public view returns (string memory) {
        require(semester > 0, "Semester must be greater than 0"); // Validate semester

        for (uint256 i = studentResults[rollNo].length-1; i >0; i--) {
            if (studentResults[rollNo][i].semester == semester) {
                return studentResults[rollNo][i].resHash;
            }
        }

        return "not found"; // Return empty string if result not found
    }

    // Function to get all results for a student
    function getAllResults(string memory rollNo) public view returns (Result[] memory) {
        return studentResults[rollNo];
    }
}
