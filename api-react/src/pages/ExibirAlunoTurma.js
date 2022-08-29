import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class ExibirAlunoTurma extends Component 
{

    nível_de_ensino = {
        fundamental: 'Fundamental',
        médio: 'Médio',
    };

    turno = {
        manha: 'Manhã',
        tarde: 'Tarde',
        noite: 'Noite'
    };

    state = {
        ano_de_execução: '',
        nível_de_ensino: '',
        série: '',
        turno: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    async componentDidMount() {
        const stud_id = this.props.match.params.id;

        const res = await axios.get(`http://localhost:8000/api/aluno/${stud_id}/turma`);
        
        console.log(res.data);
        if (res.data.status === 200 && res.data.relacao != null) 
        {
            this.setState({
                id: res.data.relacao.turma.id,
                ano_de_execução: res.data.relacao.turma.ano_de_execução,
                nível_de_ensino: res.data.relacao.turma.nível_de_ensino,
                série: res.data.relacao.turma.série,
                turno: res.data.relacao.turma.turno,
                aluno_id: res.data.relacao.aluno_id
            });
        }
        else 
        {
            swal({
                title: "Alerta!",
                text: "Aluno(a) não possui nenhuma turma cadastrada!",
                icon: "warning",
                button: {
                    text: "OK"
                }
            }).then(() => {
                window.location = "http://localhost:3000/alunos"
            });
        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Turma | ID Turma: {this.state.id}
                                    <Link to={'/alunos'} className="btn btn-danger btn-sm float-end">Fechar</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateTurma}>
                                    <div className="form-group mb-3">
                                        <label>Ano Letivo</label>
                                        <input type="year" name="ano_de_execução" onChange={this.handleInput} value={this.state.ano_de_execução} class="form-control" disabled></input>
                                        <span className="text-danger">{this.state.error_list.ano_de_execução}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nível de Ensino</label>
                                        <select type="text" name="nível_de_ensino" onChange={this.handleInput} value={this.state.nível_de_ensino} class="form-control" disabled>
                                        <option value="{this.state.nível_de_ensino}">{this.state.nível_de_ensino}</option>
                                           <option value="Fundamental">Fundamental</option>
                                           <option value="Médio">Médio</option>
                                        </select>
                                        <span className="text-danger">{this.state.error_list.nível_de_ensino}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Série</label>
                                        <input type="text" name="série" onChange={this.handleInput} value={this.state.série} class="form-control" disabled></input>
                                        <span className="text-danger">{this.state.error_list.série}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Turno</label>
                                        <select type="text" name="turno" onChange={this.handleInput} value={this.state.turno} class="form-control" disabled>
                                        <option value="{this.state.turno}">{this.state.turno}</option>
                                           <option value="Manhã">Manhã</option>
                                           <option value="Tarde">Tarde</option>
                                           <option value="Noite">Noite</option>
                                        </select>
                                        <span className="text-danger">{this.state.error_list.turno}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>ID Aluno</label>
                                        <input type="text" name="aluno" onChange={this.handleInput} value={this.state.aluno_id} class="form-control" disabled></input>
                                        <span className="text-danger">{this.state.error_list.aluno_id}</span>
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

export default ExibirAlunoTurma