import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Alunos from './pages/Alunos';
import AdicionarAluno from './pages/AdicionarAluno';
import EditarAluno from './pages/EditarAluno';
import Turmas from './pages/Turmas';
import AdicionarTurma from './pages/AdicionarTurma';
import EditarTurma from './pages/EditarTurma';


function App() {
  return (
    <>
      <header>

      </header>
      <main>
        <Router>
          <Switch>
          <Route exact path="/" component={Alunos} />
           
            <Route exact path="/alunos" component={Alunos} />
            <Route path="/alunos/store" component={AdicionarAluno} />
            <Route path="/alunos/:id" component={EditarAluno} />

            <Route exact path="/turmas" component={Turmas} />
            <Route path="/turmas/store" component={AdicionarTurma} />
            <Route path="/turmas/:id" component={EditarTurma} />

          </Switch>
        </Router>
      </main>
    </>
  );
}

export default App;
