// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.5.0 <0.9.0;

contract Student {

    // Define a structure to store student data
    struct Studentstruc {
        string name;
        uint256 rollNo;
        string section;
        uint256 year;
        string branch;
        string hod;
        uint256 semester;
        string grade;
    }

    // Mapping to store students by their roll numbers
    mapping(uint256 => Studentstruc) public students;

    // Function to add a new student
    function addStudent(
        uint256 _rollNo,
        string memory _name,
        string memory _section,
        uint256 _year,
        string memory _branch,
        string memory _hod,
        uint256 _semester,
        string memory _grade
    ) public {
        students[_rollNo] = Studentstruc(
            _name,
            _rollNo,
            _section,
            _year,
            _branch,
            _hod,
            _semester,
            _grade
        );
    }

    // Function to get the data of a student by their roll number
    function getStudent(uint256 _rollNo) public view returns (Studentstruc memory) {
        return students[_rollNo];
    }
}

   
