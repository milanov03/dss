import React from 'react';
import { useState } from 'react';
import { Grade } from './interfaces';

interface Props {
  grades: Grade[];
  onSelectedGrade: (data: Grade ) => void;
  onDeletedGrade: (grades: Grade[]) => void;
}

const GradeList: React.FC<Props> = (props: Props) => {
  const [isGradeDeleted] = useState(false);
  const [selectedGrade,setGrade] = useState<Grade>();
  const handleClick = (id: number,ignoreItem: boolean) => {
    let foundGrade = props.grades.find((item) => item.id === id) as Grade;
    props.onSelectedGrade(foundGrade);
  };

  const handleDelete = (e:any,id: number) => {
    console.log(id);
    e.stopPropagation()
    
    let deletedGrade = props.grades.find((item) => item.id === id) as Grade;
    deletedGrade.active = false;
    console.log(deletedGrade);
    setGrade(selectedGrade);
    const updatedGrades = props.grades.filter((grade) => grade.id !== id);
    props.onDeletedGrade(updatedGrades);
  };

  return (
    <>
      <h2>Grade List</h2>

      {props.grades.length === 0 ? <h3>No Grades found</h3> : null}
      <ul>
        {props.grades.map((item) => (
          <li key={item.id} onClick={(e) => { handleClick(item.id,isGradeDeleted) }}>
            <p className='id'>{item.id}</p>
            <p className='field1'>{item.studentFirstName}</p>
            <p className='field2'>{item.studentLastName}</p>
            <p className='field3'>{item.subject}</p>
            <p className='field4'>{item.score}</p>
            <p className='field5'>{item.date.toString()}</p>

            <button className="deleteButton" onClick={(e) => handleDelete(e,item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GradeList;
