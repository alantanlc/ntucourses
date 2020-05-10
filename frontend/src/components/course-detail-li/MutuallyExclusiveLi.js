import React from 'react';

function MutuallyExclusiveLi(props) {
    let result = null;
    
    if(props.mutually_exclusive_with) {
        result = (
            <li data-toggle="tooltip" title="Mutually Exclusive">
                <span style={{fontWeight: 100}} className="li-span">Mutually exclusive with</span>
                &nbsp;
                {props.mutually_exclusive_with}
                {/* <Link to={`courses/${course_code}`}>CZ1011</Link> and <Link to={`courses/${course_code}`}>CZ1012</Link> */}
            </li>
        )
    }

    return result;
}

export default MutuallyExclusiveLi;