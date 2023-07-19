import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Grade } from './interfaces';

interface Props {
  onSave: (grade: Grade) => void;
  onUpdate: (grade: Grade) => void;
  selectedGrade: Grade;

}

const GradeDetails: React.FC<Props> = (props: Props) => {

  let emptyGrade: Grade = {
    id: -1,
    studentFirstName: "",
    studentLastName: "",
    subject: "",
    score: 0,
    active: true,
    date: new Date(),
  };

  const [selectedGrade, setGrade] = useState<Grade>(emptyGrade);

  useEffect(() => {
    if (props.selectedGrade.active) {
      setGrade(props.selectedGrade);
    } else {
      handleClear();
    }
  }, [props.selectedGrade])


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrade(prevGrade => ({ ...prevGrade, [name]: value }));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    setGrade(prevGrade => ({ ...prevGrade, date: new Date(value) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedGrade.id !== -1) {
      props.onUpdate(selectedGrade);
    } else {
      props.onSave(selectedGrade);
    }

  };

  const handleClear = () => {
    setGrade(emptyGrade);
  };

  return (
    <>
      <h2>Grade Details:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentFirstName">Student's first name:</label>
          <br/>
          <input
            type="text"
            id="field1"
            name="studentFirstName"
            value={selectedGrade.studentFirstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="studentLastName">Student's last name:</label>
          <br/>
          <input
            type="text"
            id="field2"
            name="studentLastName"
            value={selectedGrade.studentLastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <br/>
          <input
            type="text"
            id="field3"
            name="subject"
            value={selectedGrade.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="score">Score:</label>
          <br/>
          <input
            type="score"
            id="field4"
            name="score"
            value={selectedGrade.score}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <br/>
          <input
            type="date"
            id="field5"
            name="date"
            value={selectedGrade.date.toISOString().substr(0, 10)}
            onChange={handleDateChange}
            required
          />
        </div>
        <button id='saveButton' type='submit'>Save</button>
      </form>

      <button id='clearButton' onClick={handleClear} >Clear</button>
    </>
  );
};

export default GradeDetails;