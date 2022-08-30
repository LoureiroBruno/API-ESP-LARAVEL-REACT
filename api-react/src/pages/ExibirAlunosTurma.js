import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'moment';

class ExibirAlunosTurma extends Component 
{
    state = {
        AlunosTurma: [],
        loading: true,
    }
    
    async componentDidMount() {

        const res = await axios.get('http://localhost:8000/api/alunosturma');        
        if (res.data.status === 200) 
        {
            this.setState({
                relacao: res.data.relacao,
                loading: false,
            });
        }
    }


    render() {


        var student_HTMLTABLE = "";

        if (this.state.loading) {
            student_HTMLTABLE = <tr><td colSpan="7"> <h2> Exibindo os dados... </h2> </td></tr>
        } else {
            student_HTMLTABLE =
            this.state.relacao.map( (item) => {
                item.aluno.data_de_nascimento = Moment().format('DD-MM-YYYY')
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.aluno.nome}</td>
                        <td>{item.aluno.telefone}</td>
                        <td>{item.aluno.e_mail}</td>
                        <td>{item.aluno.data_de_nascimento}</td>
                        <td>{item.aluno.genero}</td>
                        <td>{item.turma.ano_de_execução}</td>
                        <td>{item.turma.nível_de_ensino}</td>
                        <td>{item.turma.série}</td>
                        <td>{item.turma.turno}</td>
                    </tr>
                );
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group mb-3">
                            <h1>
                                <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                                    <Link to={'/alunos'} className="btn btn-dark float-end">Menu de Aluno</Link>
                                    <Link to={'/turmas'} className="btn btn-dark float-end">Menu de Turma</Link>
                                </div>
                            </h1>
                          
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h2>Todos Alunos por Turma
                                    <Link to={'alunosturma'} className="btn btn-warning float-end">Cadastrar Aluno/Turma</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Telefone</th>
                                            <th>E-mail</th>
                                            <th>Data de nascimento</th>
                                            <th>Gênero</th>
                                            <th>Ano Letivo</th>
                                            <th>Nível de Ensino</th>
                                            <th>Série</th>
                                            <th>Turno</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExibirAlunosTurma