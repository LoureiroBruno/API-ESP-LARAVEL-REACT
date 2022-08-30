import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ExibirAlunosTurma from './pages/ExibirAlunosTurma';
import AdicionarAlunosTurma from './pages/AdicionarAlunosTurma';

import Alunos from './pages/Alunos';
import AdicionarAluno from './pages/AdicionarAluno';
import EditarAluno from './pages/EditarAluno';

import Turmas from './pages/Turmas';
import AdicionarTurma from './pages/AdicionarTurma';
import EditarTurma from './pages/EditarTurma';

import ExibirAlunoTurma from './pages/ExibirAlunoTurma';

import ExibirTurmaAlunos from './pages/ExibirTurmaAlunos';



function App() {
  return (
    <>
      <header>

      </header>
      <main>
        <Router>
          <Switch>
          <Route exact path="/" component={ExibirAlunosTurma} />
          <Route exact path="/alunosturma" component={AdicionarAlunosTurma} />

            <Route exact path="/alunos" component={Alunos} />
            <Route path="/alunos/store" component={AdicionarAluno} />
            <Route path="/alunos/:id" component={EditarAluno} />

            <Route exact path="/turmas" component={Turmas} />
            <Route path="/turmas/store" component={AdicionarTurma} />
            <Route path="/turmas/:id" component={EditarTurma} />

            <Route path="/aluno/:id/turma" component={ExibirAlunoTurma} />

            <Route path="/turma/:id/alunos" component={ExibirTurmaAlunos} />

          </Switch>
        </Router>
      </main>
    </>
  );
}

export default App;
