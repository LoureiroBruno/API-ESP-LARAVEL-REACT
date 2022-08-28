import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'moment';

class Turmas extends Component 
{
    state = {
        turmas: [],
        loading: true,
    }
    
    async componentDidMount() {

        const res = await axios.get('http://localhost:8000/api/turmas');
        if (res.data.status === 200) 
        {
            this.setState({
                turmas: res.data.turmas,
                loading: false,
            });
        }
    }

    deleteTurma = async (e, id) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Exluindo";
        
        const res = await axios.delete(`http://localhost:8000/api/turmas/${id}`);
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
            this.state.turmas.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.ano_de_execução}</td>
                        <td>{item.nível_de_ensino}</td>
                        <td>{item.série}</td>
                        <td>{item.turno}</td>
                        <td>
                            <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                                <Link to={`turmas/${item.id}`} className="btn btn-outline-secondary btn-sm">Editar</Link>
                                <button type="button" onClick={(e) => this.deleteTurma(e, item.id)} className="btn btn-outline-danger btn-sm">Excluir</button>
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
                                <Link to={'/'} className="btn btn-dark float-start mb-4">Menu Principal</Link>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h2>Lista de Turmas
                                    <Link to={'turmas/store'} className="btn btn-warning float-end">Cadastrar Turma</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Ano Letivo</th>
                                            <th>Nível de Ensino</th>
                                            <th>Série</th>
                                            <th>Turno</th>
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

export default Turmas