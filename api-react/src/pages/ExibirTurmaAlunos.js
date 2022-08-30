import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'moment';

class ExibirTurmaAlunos extends Component 
{
    state = {
        relacao: [],
        loading: true,
    }
    
    async componentDidMount() {

        const stud_id = this.props.match.params.id;
        const res = await axios.get(`http://localhost:8000/api/turma/${stud_id}/alunos`);

        console.log(res.data);

        const rel = res.data.relacao
        if (res.data.status === 200 && rel.length != 0) 
        {
            this.setState({
                relacao: res.data.relacao,
                loading: false,
            });
        }
        else 
        {
            swal({
                title: "Alerta!",
                text: "A Turma não possui nenhum registro de aluno(a)!" + "\n\n",
                icon: "warning",
                button: {
                    text: "OK"
                }
            }).then(() => {
                 window.location = "http://localhost:3000/alunosturma"
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
                        <td>{item.turma_id}</td>
                    </tr>
                );
            });
        }

        return (
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h2>Lista de Alunos
                                    <Link to={'/turmas'} className="btn btn-danger btn-sm float-end">Fechar</Link>
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
                                            <th>ID Turma</th>
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

export default ExibirTurmaAlunos