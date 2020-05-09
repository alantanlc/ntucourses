import React from 'react';

function renderExamDates(exams) {
    let result = exams.map(exam => {
        return exam.date + ' ' + exam.day + ' ' + exam.time + ' ' + exam.duration + 'HRS (Sem ' + exam.semester + ')'
    })
    return result.join(' || ');
}

function ExamLi(props) {
    let result = null;
    if(Array.isArray(props.exams) && props.exams.length) {
        result = (
            <li data-toggle="tooltip" title="Exam">
                <span style={{fontWeight: 100}} className="badge badge-light">Exam</span>
                &nbsp;
                {renderExamDates(props.exams)}
            </li>
        )
    }

    return result;
}

export default ExamLi;