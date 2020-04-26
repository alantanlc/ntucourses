import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/layout/Header';

import Courses from './components/Courses';
import SearchCourse from './components/SearchCourse';
import Refine from './components/Refine';

import CourseDetail from './components/pages/CourseDetail';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    courses: [
      {
        course_code: 'CZ1003',
        title: 'Introduction to Computational Thinking',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non leo at magna tincidunt bibendum vel a metus. Sed eget diam quis enim feugiat dignissim. Nullam at purus in erat dictum imperdiet eu eget tellus. Etiam sit amet facilisis dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur elementum maximus nibh, non ultricies metus tincidunt vel. Mauris eget maximus arcu. Integer ut elit id nisl consequat aliquet. Suspendisse leo felis, dictum eget sapien ac, dapibus posuere leo. Duis eu metus sed metus vehicula ullamcorper.',
        academic_units: 3.0,
        grade_type: true,
      },
      {
        course_code: 'CZ1005',
        title: 'Digital Logic',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non leo at magna tincidunt bibendum vel a metus. Sed eget diam quis enim feugiat dignissim. Nullam at purus in erat dictum imperdiet eu eget tellus. Etiam sit amet facilisis dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur elementum maximus nibh, non ultricies metus tincidunt vel. Mauris eget maximus arcu. Integer ut elit id nisl consequat aliquet. Suspendisse leo felis, dictum eget sapien ac, dapibus posuere leo. Duis eu metus sed metus vehicula ullamcorper.',
        academic_units: 3.0,
        grade_type: true,
      },
      {
        course_code: 'CZ2005',
        title: 'Operating Systems',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non leo at magna tincidunt bibendum vel a metus. Sed eget diam quis enim feugiat dignissim. Nullam at purus in erat dictum imperdiet eu eget tellus. Etiam sit amet facilisis dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur elementum maximus nibh, non ultricies metus tincidunt vel. Mauris eget maximus arcu. Integer ut elit id nisl consequat aliquet. Suspendisse leo felis, dictum eget sapien ac, dapibus posuere leo. Duis eu metus sed metus vehicula ullamcorper.',
        academic_units: 3.0,
        grade_type: true,
      },
    ]
  }

  componentDidMount() {

  }

  searchCourse = (keyword) => {
    console.log(keyword)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container-lg">
            <Route exact path="/" render={props => (
              <React.Fragment>
                <div className="row">
                  <div className="col-3">
                    <Refine />
                  </div>
                    <div className="col">
                      <SearchCourse searchCourse={this.searchCourse} />
                      <br />
                      <p>312 results found in 4 ms</p>
                      <Courses courses={this.state.courses} />
                  </div>
                </div>
              </React.Fragment>
            )} />
            
            <Route path="/course" component={CourseDetail} />
          </div>
        </div>
      </Router>
    )
  }

}

export default App;
