import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Header from './components/layout/Header';

import CourseDetail from './components/pages/CourseDetail';
import Courses from './components/pages/Courses';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Privacy from './components/pages/Privacy';
import Terms from './components/pages/Terms';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container-lg">            
            <Route exact path="/courses/:course_code" component={CourseDetail} />
            <Route exact path="/courses" component={Courses} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route exact path="/">
              <Redirect to="/courses" />
            </Route>
          </div>
        </div>
      </Router>
    )
  }

}

export default App;
