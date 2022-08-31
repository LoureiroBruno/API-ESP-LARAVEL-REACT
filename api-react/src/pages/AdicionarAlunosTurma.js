import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class AdicionarAlunosTurma extends Component 
{
    state = {
        aluno: [],
        turma: [],
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:8000/api/alunosturma');
        const resAlunos = await axios.get('http://localhost:8000/api/alunos');
        const resTurmas = await axios.get('http://localhost:8000/api/turmas');

        if (res.data.status === 200 && resAlunos.data.status === 200 && resTurmas.data.status === 200) 
        {
            this.setState({
                aluno: resAlunos.data.students,
                turma: resTurmas.data.turmas
            })
        }
        else if(res.data.status === 404)
        {
            swal({
                title: "Alerta!",
                text: res.data.message,
                icon: "warning",
                buttons: "OK"
            });
            this.props.history.push('/');
        }

        
    }

    
    saveAlunosTurma = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:8000/api/alunosturma', this.state);

        if(res.data.status === 201)
        {
            swal({
                title: "Cadastrado!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
            })

            this.props.history.push('/');
            this.setState({
                aluno_id: '',
                turma_id: '',
            });
        } 
        else 
        {
            this.setState({
                error_list: res.data.validate_err,
            })
        }
    }

    render() {

        var alunoHTML_SELECT = "";

        if (this.state.loading) {
            alunoHTML_SELECT = <option></option>
        } else {
            alunoHTML_SELECT =
            this.state.aluno.map( (item) => {
                return (
                    <option value={item.id} key={item.id}>ID: {item.id} | Nome: {item.nome} | Email: {item.e_mail}| Data de Nascimento: {item.data_de_nascimento}</option>
                );
               
            });
        }

        var turmaHTML_SELECT = "";

        if (this.state.loading) {
            turmaHTML_SELECT = <option></option>
        } else {
            turmaHTML_SELECT =
            this.state.turma.map( (item) => {
                return (
                    <option value={item.id} key={item.id}>ID: {item.id} | Ano Letivo: {item.ano_de_execução} | Nível de Ensino: {item.nível_de_ensino}| Série: {item.série} Turno: {item.turno} </option>
                );
               
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Matrícular Aluno
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end">Fechar</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                            <form onSubmit={this.saveAlunosTurma}>
                                <label>Dados do Aluno</label>
                                <div className="form-group mb-3">
                                    <select id="aluno_id" type="text" name="aluno_id" onChange={this.handleInput} value={this.state.aluno_id} class="form-control">
                                    <option value={this.state.aluno.id}>Selecione</option>
                                        {alunoHTML_SELECT}
                                    </select>
                                    <span className="text-danger">{this.state.error_list.aluno_id}</span>
                                </div>
                                <label>Dados da Turma</label>
                                <div className="form-group mb-3">
                                    <select type="text" name="turma_id" onChange={this.handleInput} value={this.state.turma_id} class="form-control">
                                    <option value={this.state.turma.id}>Selecione</option>
                                        {turmaHTML_SELECT}
                                    </select>
                                    <span className="text-danger">{this.state.error_list.turma_id}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary mt-4">Salvar</button>
                                </div>
                                
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdicionarAlunosTurma