import React, { Component } from 'react'
import CheckBox from './CheckBox';

export class ProgrammeFilter extends Component {
    render() {
        return (
        <div style={{fontSize: '0.85em'}}>
            <div>
                <button type="button" style={{position: 'absolute', right: '25px', marginTop: '3px', background: '0', color: '#999', border: '0', fontSize: '0.8rem'}}>
                    <i className="fa fa-search" />
                </button>
                <input type="text" placeholder="Search programme" style={{width: '100%', padding: '3px 10px', border: 'thin solid #e7e7e7', fontSize: '0.8rem'}} />
            </div>

            <div style={{border: 'thin solid #e7e7e7', borderTop: 0, backgroundColor: '#fff', padding: '3px 10px', height: '240px', overflowY: 'scroll'}}>
            
                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem'}}>Single Degree</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'SD')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '6rem'}}>Double Degree</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'DD')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '6rem'}}>Minor</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'MI')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '6rem'}}>General Education</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'GE')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }                

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '6rem'}}>Scholars</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'SP')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '6rem'}}>Unrestricted Electives</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'UE')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }
                
            </div>

            {/* <span style={{padding: '3px', backgroundColor: '#e7e7e7', borderBottom: 'thin solid #aaa'}}>Accountancy Year 1 x</span> */}

        </div>
        )
    }
}

const optionStyle = {
    backgroundColor: '#e7e7e7'
}

export default ProgrammeFilter