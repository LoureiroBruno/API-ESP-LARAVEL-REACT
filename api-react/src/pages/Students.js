import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Student extends Component 
{
    state = {
        students: [],
        loading: true,
    }
    
    async componentDidMount() {

        const res = await axios.get('http://localhost:8000/api/alunos');
        if (res.data.status === 200) 
        {
            this.setState({
                students: res.data.students,
                loading: false,
            });
        }
    }

    deleteStudent = async (e, id) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Exluindo";
        
        const res = await axios.delete(`http://localhost:8000/api/alunos/${id}`);
        if (res.data.status === 204) 
        {
            thidClickedFunda.closest("tr").remove();

            swal({
                title: "Ecluído!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
            })
        }
    }

    render() {


        var student_HTMLTABLE = "";

        if (this.state.loading) {
            student_HTMLTABLE = <tr><td colSpan="7"> <h2> Exibindo os dados... </h2> </td></tr>
        } else {
            student_HTMLTABLE =
            this.state.students.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.telefone}</td>
                        <td>{item.e_mail}</td>
                        <td>{item.data_de_nascimento}</td>
                        <td>{item.genero}</td>
                        <td>
                            <Link to={`alunos/${item.id}`} className="btn btn-outline-secondary btn-sm">Editar</Link>
                      
                            <button type="button" onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-outline-danger btn-sm">Excluir</button>
                        </td>
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
                                <h4>Tabela de Alunos
                                    <Link to={'alunos/store'} className="btn btn-warning btn-sm float-end">Adicionar</Link>
                                </h4>
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

export default Student