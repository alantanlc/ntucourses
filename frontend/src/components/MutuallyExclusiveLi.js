import React from 'react';

function MutuallyExclusiveLi(props) {
    let result = null;
    
    if(props.mutually_exclusive_with) {
        result = (
            <li data-toggle="tooltip" title="Mutually Exclusive">
                {/* <span aria-hidden="true" className="fa fa-times-circle icon-fact"></span> */}
                <span style={{fontWeight: 100}} className="badge badge-light">Mutually exclusive with</span>
                &nbsp;
                {props.mutually_exclusive_with}
                {/* <Link to={`courses/${course_code}`}>CZ1011</Link> and <Link to={`courses/${course_code}`}>CZ1012</Link> */}
            </li>
        )
    }

    return result;
}

export default MutuallyExclusiveLi;