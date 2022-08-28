import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class AdicionarTurma extends Component 
{
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
    
    saveStudent = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:8000/api/turmas', this.state);

        if(res.data.status === 201)
        {
            swal({
                title: "Cadastrado!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
            })

            this.props.history.push('/turmas');
            this.setState({
                ano_de_execução: '',
                nível_de_ensino: '',
                série: '',
                turno: '',
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Adicionar Turma
                                    <Link to={'/turmas'} className="btn btn-danger btn-sm float-end">Fechar</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group mb-3">
                                        <label>Ano Letivo</label>
                                        <input type="year" name="ano_de_execução" onChange={this.handleInput} value={this.state.ano_de_execução} class="form-control" placeholder='Informe o ano letivo.'></input>
                                        <span className="text-danger">{this.state.error_list.ano_de_execução}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nível de Ensino</label>
                                        <select type="text" name="nível_de_ensino" onChange={this.handleInput} value={this.state.nível_de_ensino} class="form-control">
                                        <option value="">Selecione</option>
                                           <option value="Fundamental">Fundamental</option>
                                           <option value="Médio">Médio</option>
                                        </select>
                                        <span className="text-danger">{this.state.error_list.nível_de_ensino}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Série</label>
                                        <input type="text" name="série" onChange={this.handleInput} value={this.state.série} class="form-control" placeholder='Informe a série.'></input>
                                        <span className="text-danger">{this.state.error_list.série}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Turno</label>
                                        <select type="text" name="turno" onChange={this.handleInput} value={this.state.turno} class="form-control">
                                        <option value="">Selecione</option>
                                           <option value="Manhã">Manhã</option>
                                           <option value="Tarde">Tarde</option>
                                           <option value="Noite">Noite</option>
                                        </select>
                                        <span className="text-danger">{this.state.error_list.turno}</span>
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

export default AdicionarTurma