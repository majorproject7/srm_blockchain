import React, { useState } from 'react';

const MyForm = () => {
  const years = ["Year1", "Year2", "Year3", "Year4"];
  const sections = ["A", "B"];
  const subjects = ["Python", "C",  "DSA", "JAVA", "C++", "ADE", "CP", "PP", "NLP", "DP", "BIGDATA", "MS", "KRR", "CN"];

  const [formData, setFormData] = useState({
    year: years[0],
    section: sections[0],
    selectedSubjects: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    const selectedSubjects = checked
      ? [...formData.selectedSubjects, value]
      : formData.selectedSubjects.filter((subject) => subject !== value);

    setFormData({ ...formData, selectedSubjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format data into the desired map structure
    const { year, section, selectedSubjects } = formData;
    const newYear = new Map();
    newYear.set(section, selectedSubjects);

    // Replace the following line with your MongoDB insertion logic
    console.log("Data to be inserted into MongoDB:",year,"----", newYear);
  };

  return (
    <div>
      <h1>Section Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Year:
          <select name="year" value={formData.year} onChange={handleInputChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Section:
          <select name="section" value={formData.section} onChange={handleInputChange}>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Subjects:
          {subjects.map((subject) => (
            <div key={subject}>
              <input
                type="checkbox"
                name={subject}
                value={subject}
                checked={formData.selectedSubjects.includes(subject)}
                onChange={handleSubjectChange}
              />
              {subject}
            </div>
          ))}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
