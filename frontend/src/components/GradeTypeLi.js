import React from 'react';

function GradeTypeLi(props) {
    let result = null;
    
    if(props.grade_type) {
        result = (
            <li data-toggle="tooltip" title="Grade Type">
                {/* <span aria-hidden="true" className="fa fa-child icon-fact"></span> */}
                <span style={{fontWeight: 100}} className="badge badge-light">Grade Type</span>
                &nbsp;
                Pass / Fail
            </li>
        )
    }

    return result;
}

export default GradeTypeLi;