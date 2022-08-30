import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'moment';

class Alunos extends Component {
    state = {
        students: [],
        loading: true,
    }

    async componentDidMount() {

        const res = await axios.get('http://localhost:8000/api/alunos');
        if (res.data.status === 200) {
            this.setState({
                students: res.data.students,
                loading: false,
            });
        }
    }

    deleteAluno(e, id) {
        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Exluindo";

        e.preventDefault();
        swal({
            title: "Atenção",
            text: "Deseja excluir o registro deste aluno?" + "\n\n",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`http://localhost:8000/api/alunos/${id}`)
                        .then(res => {
                            if (res.data.status === 204) {
                                thidClickedFunda.closest("tr").remove();

                                swal({
                                    title: "Excluído!",
                                    text: res.data.message,
                                    icon: "success",
                                    buttons: "OK"
                                })
                            }
                        });
                } else {
                    window.location = "http://localhost:3000/alunos"
                }
            });
    }

    render() {


        var student_HTMLTABLE = "";

        if (this.state.loading) {
            student_HTMLTABLE = <tr><td colSpan="7"> <h2> Exibindo os dados... </h2> </td></tr>
        } else {
            student_HTMLTABLE =
                this.state.students.map((item) => {
                    item.data_de_nascimento = Moment().format('DD-MM-YYYY')
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.telefone}</td>
                            <td>{item.e_mail}</td>
                            <td>{item.data_de_nascimento}</td>
                            <td>{item.genero}</td>
                            <td>
                                <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                                    <Link to={`alunos/${item.id}`} className="btn btn-outline-secondary btn-sm">Editar</Link>
                                    <button type="button" onClick={(e) => this.deleteAluno(e, item.id)} className="btn btn-outline-danger btn-sm">Excluir</button>
                                    <Link to={`aluno/${item.id}/turma`} className="btn btn-link" title='Exibir Turma'>Detalhes</Link>
                                </div>
                            </td>
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
                                <Link to={'/'} className="btn btn-dark float-start mb-4" title='ir para Todos Alunos por Turma'>Menu Principal</Link>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h2>Lista de Alunos
                                    <Link to={'alunos/store'} className="btn btn-warning float-end">Cadastrar Aluno</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Telefone</th>
                                            <th>E-mail</th>
                                            <th>Data de nascimento</th>
                                            <th>Gênero</th>
                                            <th scope="col" class="col-2" id="th-coluna-acoes-tabela-series">Ações</th>
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

export default Alunos