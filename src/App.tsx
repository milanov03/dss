import React, { useState } from "react";

import GradeDetails from "./GradeDetails";
import { Grade } from "./interfaces";
import GradeList from "./GradeList";

const App: React.FC = () => {
  let grade1: Grade = {
    id: 1,
    studentFirstName: "Ivan",
    studentLastName: "Ivanov",
    date: new Date(),
    subject: "Math",
    score: 3,
    active: true,
  };

  let grade2: Grade = {
    id: 2,
    studentFirstName: "Mitko",
    studentLastName: "Petrov",
    date: new Date(),
    subject: "English",
    score: 5,
    active: true,
  };

  let grade3: Grade = {
    id: 3,
    studentFirstName: "Pepi",
    studentLastName: "Kirilov",
    date: new Date(),
    subject: "Bulgarian",
    score: 4,
    active: true,
  };
  let gradesInitial = [grade1, grade2, grade3];

  const [grades, setGrades] = useState(gradesInitial);
  const [selectedGrade, setGrade] = useState<Grade>(grade1);

  const handleSaveGrade = (grade: Grade) => {
    let gradesLength = grades.length + 1;
    grade.id = gradesLength;
    let gradeArray = [...grades, grade] as Grade[];
    setGrades(gradeArray);
  };

  const handleGradeUpdate = (grade: Grade) => {
    let gradeIndex = grades.findIndex((item) => item.id === grade.id);
    let gradesArr = [...grades];
    let updatedGrade = { ...grades[gradeIndex] };
    updatedGrade = grade;
    gradesArr[gradeIndex] = updatedGrade;
    setGrades(gradesArr);
  };
  const handleGradeSelection = (grade: Grade) => {
    setGrades(grades);
  };
  const handleGradeDelete = (gradeArr: Grade[]) => {
    let idIndex = 1;
    for (let i = 0; i < gradeArr.length; i++) {
      gradeArr[i].id = idIndex++;
    }
    return gradeArr;
  };

  return (
    <div className="container">
      <div className="navbar">Grade Management System</div>
      <div className="content-list">
        <GradeList
          grades={grades}
          onSelectedGrade={handleGradeSelection}
          onDeletedGrade={(newGrades) =>
            setGrades(handleGradeDelete(newGrades))
          }
        />
      </div>
      <div className="content-details">
        <GradeDetails
          onSave={handleSaveGrade}
          onUpdate={handleGradeUpdate}
          selectedGrade={selectedGrade}
        />
      </div>
      <div className="footer">DSS GRADES - Milan Milanov TM</div>
    </div>
  );
};
export default App;
