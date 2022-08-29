import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class EditarTurma extends Component 
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

        const res = await axios.get(`http://localhost:8000/api/turmas/${stud_id}`);

        if (res.data.status === 200) 
        {
            this.setState({
                id: res.data.turma.id,
                ano_de_execução: res.data.turma.ano_de_execução,
                nível_de_ensino: res.data.turma.nível_de_ensino,
                série: res.data.turma.série,
                turno: res.data.turma.turno,
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
            this.props.history.push('/turmas');
        }
    }

    updateTurma = async (e) => {
        e.preventDefault();

        document.getElementById('updatebtn').disabled = true;
        document.getElementById('updatebtn').innerText = "Atualizando os dados";
        const stud_id = this.props.match.params.id;
        const res = await axios.put(`http://localhost:8000/api/turmas/${stud_id}`, this.state);

        if(res.data.status === 204)
        {
            swal({
                title: "Atualizado!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
            })

            document.getElementById('updatebtn').disabled = false;
            document.getElementById('updatebtn').innerText = "Atualizando os dados";
            this.props.history.push('/turmas');
        } 
        else if (res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                buttons: "OK"
            });
            this.props.history.push('/turmas');
        } else 
        {
            this.setState({
                error_list: res.data.validate_err,
            })
            document.getElementById('updatebtn').disabled = false;
            document.getElementById('updatebtn').innerText = "Atualizando os dados";
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>Editar Turma ID: {this.state.id}
                                    <Link to={'/turmas'} className="btn btn-danger btn-sm float-end">Fechar</Link>
                                </h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateTurma}>
                                    <div className="form-group mb-3">
                                        <label>Ano Letivo</label>
                                        <input type="year" name="ano_de_execução" onChange={this.handleInput} value={this.state.ano_de_execução} class="form-control" placeholder='Informe o ano letivo.'></input>
                                        <span className="text-danger">{this.state.error_list.ano_de_execução}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nível de Ensino</label>
                                        <select type="text" name="nível_de_ensino" onChange={this.handleInput} value={this.state.nível_de_ensino} class="form-control">
                                        <option value="{this.state.nível_de_ensino}">{this.state.nível_de_ensino}</option>
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
                                        <option value="{this.state.turno}">{this.state.turno}</option>
                                           <option value="Manhã">Manhã</option>
                                           <option value="Tarde">Tarde</option>
                                           <option value="Noite">Noite</option>
                                        </select>
                                        <span className="text-danger">{this.state.error_list.turno}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary mt-4">Atualizar</button>
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

export default EditarTurma