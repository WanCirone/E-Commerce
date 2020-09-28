import React from 'react';
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Grilla from "./grilla";
import store from '../redux/store';
import { addProduct, addCategoryToProduct } from '../redux/actions';


export class Formulario extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name:"",
        categories: [],
        stock:"",
        price:""
}
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
};

  handleCheckBox = (selected) => {
    let index = this.state.categories.indexOf(selected.target.value);
    if (index < 0) {
      this.setState({
        ...this.state,
        categories: this.state.categories.concat(selected.target.value)
      })} else {
        this.setState({
          ...this.state
      })
    }
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();  
    console.log(this.state); 
    this.setState({
      name:"",
      categories: [],
      stock:"",
      price:""
    })
    setTimeout(() => {
      window.location.reload(false)
    }, 5000);
  }

  render() {
    return (
      <div>
        <h2>Agregar nuevo producto</h2>
        <Form  className="container">
          <Label for="name" className='form-control'>Nombre:</Label>
          <Input type="text" name="name" id="name" placeholder="Insertar nombre..." value={this.state.name} onChange={e => this.handleInputChange(e)} />
    
          <FormGroup>
          <Label for="category" className='form-control'>Categorias:</Label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="alimentos" onClick={(e) => this.handleCheckBox(e)}/>
            <label class="form-check-label" for="inlineCheckbox1">Alimentos</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="accesorios" onClick={(e) => this.handleCheckBox(e)}/>
            <label class="form-check-label" for="inlineCheckbox2">Accesorios</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="limpieza" onClick={(e) => this.handleCheckBox(e)}/>
            <label class="form-check-label" for="inlineCheckbox3">Limpieza</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="camas" onClick={(e) => this.handleCheckBox(e)}/>
            <label class="form-check-label" for="inlineCheckbox3">Camas</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="ropa" onClick={(e) => this.handleCheckBox(e)}/>
            <label class="form-check-label" for="inlineCheckbox3">Ropa</label>
          </div>
          </FormGroup>

        <FormGroup>
          <Label for="stock" className='form-control'>Stock:</Label>
          <Input type="number" name="stock" id="stock" value={this.state.stock} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label for="price" className='form-control'>Precio:</Label>
          <Input type="text" name="price" id="price" value={this.state.price} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Submit</button>
        {this.props.array.length && <Grilla array={this.props.array}/>} 
        </Form>
      </div>
        
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addProduct: product => dispatch(addProduct(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Formulario); 