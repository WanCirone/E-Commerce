import React from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class ModificarUsuario extends React.Component {
    constructor(props) {
    super(props);
    var user=this.props.users.filter(user => user.id==parseInt(this.props.id))[0]
        this.state = {
            admin: user.admin,
            banned: user.banned
        }
        this.changeState = this.changeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.booleanIntoWords = this.booleanIntoWords.bind(this);
    }
    
    changeState = (e) =>{
        var estado
        if(e.target.value==="NO"){
            estado="false"
        }
        if(e.target.value==="SI"){
            estado="true"
        }
        this.setState({
            [e.target.name]:estado
        })
    }


    handleSubmit(e){

        e.preventDefault()
        var url=`http://localhost:3001/user/${this.props.id}`
        fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        alert("El usuario ha sido modificado")
        window.history.back()
        
    }
    
    booleanIntoWords(x){
        if(x === false){
            return "NO"
        }
        else return "SI"
    }

    render(){
        var {id, name, surname, email, banned, admin} = this.props.users.filter(user => user.id==parseInt(this.props.id))[0]

        return (
        <div className= "container">
            <div>
            <div className= "row">
            <div class="jumbotron col">
                <h3 class="display-4">Datos del usuario</h3>
                <p class="lead">Código de usuario = # {id}</p>
                <p class="lead">Nombre = {name} {surname}</p>
                <p class="lead">Email =  {email}</p>
                <p class="lead">Esta banneado = {this.booleanIntoWords(banned)}</p>
                <p class="lead">Es admin = {this.booleanIntoWords(admin)} </p>
                <p class="lead font-weight-bold">MODIFICAR</p>
                <form id="form" onSubmit={(e)=>this.handleSubmit(e)}>
                    <label for="banned" class="lead">Banned:</label>
                    <select onChange={(e) => this.changeState(e)} name="banned">
                    <option value={this.booleanIntoWords(banned)}>{this.booleanIntoWords(banned)}</option>
                    <option value={this.booleanIntoWords(!banned)}>{this.booleanIntoWords(!banned)}</option>
                    </select>
                    <label for="admin" class="lead">Admin:</label>
                    <select onChange={(e) => this.changeState(e)} name="admin">
                    <option value={this.booleanIntoWords(admin)}> {this.booleanIntoWords(admin)} </option>
                    <option value={this.booleanIntoWords(!admin)}> {this.booleanIntoWords(!admin)} </option>
                    </select>
                </form>
                    <button className="btn btn-secondary" type="submit" form="form" value="Submit" >Confirmar cambios</button>
                    
            </div>
            </div>
        </div> 
        </div>
        )
    }

}

function mapStateToProps(state) {
        return {
        users: state.users
        };
    }
    
    
export default connect(mapStateToProps)(ModificarUsuario); 