import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Addstudent extends Component 
{

    state = {
        nome: '',
        telefone: '',
        e_mail: '',
        data_de_nascimento: '',
        genero: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    saveStudent = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:8000/api/alunos', this.state);

        if(res.data.status === 201)
        {
            // console.log(res.data.message);
            swal({
                title: "Cadastrado!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
            })

            this.props.history.push('/');
            this.setState({
                nome: '',
                telefone: '',
                e_mail: '',
                data_de_nascimento: '',
                genero: '',
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
                                <h4>Adicionar Aluno
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end">Fechar</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group mb-3">
                                        <label>Nome</label>
                                        <input type="text" name="nome" onChange={this.handleInput} value={this.state.nome} class="form-control"></input>
                                        <span className="text-danger">{this.state.error_list.nome}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Telefone</label>
                                        <input type="text" name="telefone" onChange={this.handleInput} value={this.state.telefone} class="form-control"></input>
                                        <span className="text-danger">{this.state.error_list.telefone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>E-mail</label>
                                        <input type="email" name="e_mail" onChange={this.handleInput} value={this.state.e_mail} class="form-control"></input>
                                        <span className="text-danger">{this.state.error_list.e_mail}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Data de Nascimento</label>
                                        <input type="date" name="data_de_nascimento" onChange={this.handleInput} value={this.state.data_de_nascimento} class="form-control"></input>
                                        <span className="text-danger">{this.state.error_list.data_de_nascimento}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Gênero</label>
                                        <input type="text" name="genero" onChange={this.handleInput} value={this.state.genero} class="form-control"></input>
                                        <span className="text-danger">{this.state.error_list.genero}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary btn-sm mt-4">Salvar</button>
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

export default Addstudent