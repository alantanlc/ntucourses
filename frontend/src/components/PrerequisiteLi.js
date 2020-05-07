import React from 'react';

function PrerequisiteLi(props) {
    let result = null;
    
    if(props.prerequisite) {
        result = (
            <li data-toggle="tooltip" title="Prerequisite">
                {/* <span aria-hidden="true" className="fa fa-exclamation-circle icon-fact"></span> */}
                <span style={{fontWeight: 100}} className="badge badge-light">Prerequisite</span>
                &nbsp;
                {props.prerequisite}
                {/* <Link to={`courses/${course_code}`}>CZ1011</Link> and <Link to={`courses/${course_code}`}>CZ1012</Link> */}
            </li>
        )
    }

    return result;
}

export default PrerequisiteLi;