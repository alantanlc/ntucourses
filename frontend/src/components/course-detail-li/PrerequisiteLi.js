import React from 'react';

function PrerequisiteLi(props) {
    let result = null;
    
    if(props.prerequisite) {
        result = (
            <li data-toggle="tooltip" title="Prerequisite">
                <span style={{fontWeight: 100}} className="li-span">Prerequisite</span>
                &nbsp;
                {props.prerequisite}
                {/* <Link to={`courses/${course_code}`}>CZ1011</Link> and <Link to={`courses/${course_code}`}>CZ1012</Link> */}
            </li>
        )
    }

    return result;
}

export default PrerequisiteLi;