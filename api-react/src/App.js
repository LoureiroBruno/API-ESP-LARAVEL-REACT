import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Student from './pages/Students';
import Addstudent from './pages/Addstudent';
import Editstudent from './pages/Editstudent';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Student} />
        <Route path="/alunos/store" component={Addstudent} />
        <Route path="/alunos/:id" component={Editstudent} />
      </Switch>
    </Router>
  );
}

export default App;
