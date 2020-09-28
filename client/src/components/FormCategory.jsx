import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import styles from './FormCategory.module.css';
import Unauthorized from "../imagenes/unauthorized.jpg"
import { connect } from "react-redux";

//formulario para agregar una categoria

class FormCategory extends React.Component {
    constructor() {
      super();
      this.state ={
          name:"",
          description: ""
  }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
  handleInputChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.onSubmit(this.state)
  }

  onSubmit =  (category) => {

    if(!category.name || !category.description ){
      return alert("Todos los campos deben estar completos")
    }
    else {
      var url = `http://localhost:3001/products/category`;
      var data =  {
      name: category.name,
      description:category.description
      };
      fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
          'Content-Type': 'application/json'
      },
      credentials: "include"
      })
      .then(res => res.json())
      .then(()=>alert("Categoria creada"))
      .then(()=>window.location= "http://localhost:3000/products")
      .catch(error => console.error('Error:', error))
      }
  }

  render() {
    return (
      <div>
        {this.props.user.admin===true?
      <div>
        <h2>Agregar categoria</h2>
        <Form onSubmit={this.handleSubmit} className={styles.container} >
            <Label for="name" className='form-control'>Nombre</Label>
            <Input type="text" name="name" id="name" placeholder="Insertar nombre..." value={this.state.name} onChange={e => this.handleInputChange(e)} />
    
          <FormGroup>
            <Label for="description" className='form-control'>Descripción</Label>
            <Input type="text" name="description" id="description" placeholder="Insertar descripción..." value={this.state.description} onChange={e => this.handleInputChange(e)} />
          </FormGroup>
    
          <button onChange={e => this.handleInputChange(e)} className="btn btn-primary">Submit</button>
        </Form>
      </div>
      :<img src={Unauthorized} alt="unauthorized"/> 
      }
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
   user: state.user
  };
}


export default connect(mapStateToProps)(FormCategory);