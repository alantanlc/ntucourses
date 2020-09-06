import React, { Component } from 'react'
import CheckBox from './CheckBox';

export class ProgrammeFilter extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
    }

    onChange = (e) => {
        const searchText = e.target.value
        
        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        this.timeout = setTimeout(() => {
            this.props.searchProgramme(searchText)
        }, 300);
    }

    getNumberOfSelected = () => {
        return this.props.programmes.filter(prog => prog.isChecked).length
    }

    render() {
        return (
        <div style={{fontSize: '0.85em'}}>
            <div>
                <button type="button" style={{position: 'absolute', right: '25px', marginTop: '3px', background: '0', color: '#999', border: '0', fontSize: '0.8rem'}}>
                    <i className="fa fa-search" />
                </button>
                <input type="text" placeholder="Search programme" defaultValue={this.props.keyword} ref={(input) => this.input = input} onChange={this.onChange} style={{width: '100%', padding: '3px 10px', border: 'thin solid #e7e7e7', fontSize: '0.8rem'}} />
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

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '1rem'}}>Double Degree</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'DD')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '1rem'}}>Minor</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'MI')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '1rem'}}>General Education</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'GE')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }                

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '1rem'}}>Scholars</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'SP')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }

                <div style={{color: '#999', fontWeight: '600', fontSize: '1.2rem', marginTop: '1rem'}}>Unrestricted Electives</div>
                {
                    this.props.programmes
                        .filter(prog => prog.type === 'UE')
                        .map(prog => {
                            return <CheckBox key={prog.id} filter={this.props.filter} {...prog} /> 
                        })
                }
                
            </div>

            <div style={{marginTop: '10px', fontSize: '0.8rem'}}>{this.getNumberOfSelected()} selected</div>
        </div>
        )
    }
}

export default ProgrammeFilter