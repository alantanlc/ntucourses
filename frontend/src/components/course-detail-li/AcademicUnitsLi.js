import React from 'react';

function AcademicUnitsLi(props) {
    let result = null;
    
    if(props.academic_units >= 0) {
        result = (
            <li data-toggle="tooltip" title="Academic Units">
                <span style={{fontWeight: '100'}} className="li-span">Academic units</span>
                &nbsp;
                {props.academic_units.toFixed(1)}
            </li>
        )
    }

    return result;
}

export default AcademicUnitsLi;