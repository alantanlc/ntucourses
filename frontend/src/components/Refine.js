import React, { Component } from 'react'

export class Refine extends Component {
    render() {
        return (
            <div>
                <b>Refine by</b>
                <hr />

                <div><b>Offered In</b></div>
                <form>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">Semester 1</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">Semester 2</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">Semester 3</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">Special Term I</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">Special Term II</label>
                    </div>
                </form>

                <br />
                
                <div><b>Exams</b></div>
                <form>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">No Exam</label>
                    </div>
                </form>

                <br />

                <div><b>Academic Units</b></div>
                <form>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">0-2 AU</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">3 AU</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">4 AU</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">5-8 AU</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="semester1" />
                        <label for="semester1" className="form-check-label">More than 8 AU</label>
                    </div>
                </form>


            </div>
        )
    }
}

export default Refine
