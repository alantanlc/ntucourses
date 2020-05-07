import React from 'react';

function NotAvailableLi(props) {
    let result = null;
    
    if(props.text) {
        result = (
            <li data-toggle="tooltip" title={props.title}>
                {/* <span aria-hidden="true" className="fa fa-times-circle icon-fact"></span> */}
                <span style={{fontWeight: 100}} className="badge badge-light">{props.title}</span>
                &nbsp;
                {props.text}
            </li>
        )
    }

    return result;
}

export default NotAvailableLi;