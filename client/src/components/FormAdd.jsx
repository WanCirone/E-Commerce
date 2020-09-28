import React from 'react';
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { addProduct, addCategoryToProduct } from '../redux/actions';
import Unauthorized from "../imagenes/unauthorized.jpg"

class Formulario extends React.Component {
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
        categories: this.state.categories.concat(selected.target.name)//name es id de la categoria
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
    this.onSubmit (this.state)
    this.setState({
      name:"",
      categories: [],
      stock:"",
      price:"",
      img: "",
      description: ""
    })
  }

  onSubmit = (producto) =>{
    if (!producto.name || !producto.description || !producto.price || !producto.stock){
      alert("Falta completar campos para poder agregar un producto!")
    } else {


      var url = `http://localhost:3001/products`;
      var data =  {
      name:producto.name, 
      description:producto.description, 
      price:producto.price, 
      stock:producto.stock,
      img: producto.img};
  
      fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: "include"
      }).then(res => res.json())
      .catch(error => console.log(error))
      .then(response => {
        for(let i=0; i<producto.categories.length; i++){
          var url = `http://localhost:3001/products/${response.id}/category/${producto.categories[i]}`;
        fetch(url, {
          method: 'POST', 
          headers:{
            'Content-Type': 'application/json'
          },
          credentials: "include"
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(response => console.log('Success:', response));
        }
      });
      alert("Producto agregado exitosamente")
    }
  }

  render() {
    return (
      <div> 
        {this.props.user.admin===true?
      <div>
        <h2>Agregar nuevo producto</h2>
        <Form className="container">
          <Label for="name" className='form-control'>Nombre del producto:</Label>
          <Input type="text" name="name" id="name" placeholder="Insertar nombre..." value={this.state.name} onChange={e => this.handleInputChange(e)} />
    
          <FormGroup>
          <Label for="category" className='form-control'>Categorias:</Label>
          {this.props.categories.map (c => (
          <div class="form-check form-check-inline">
            <input name={c.id} class="form-check-input" type="checkbox" id="inlineCheckbox1" value={c.name} onClick={(e) => this.handleCheckBox(e)}/>
            <label class="form-check-label" for="inlineCheckbox1">{(c.name[0].toUpperCase())+(c.name.slice(1))}</label></div>)
          )}

          </FormGroup>

        <FormGroup>
          <Label for="description" className='form-control'>Descripción:</Label>
          <Input required type="text" name="description" id="description" value={this.state.description} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label for="stock" className='form-control'>Stock:</Label>
          <Input type="number" name="stock" id="stock" min="1" value={this.state.stock} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label for="price" className='form-control'>Precio:</Label>
          <Input type="number" name="price" id="price" min="1" value={this.state.price} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label for="img" className='form-control'>Imagen:</Label>
          <Input type="text" name="img" id="img" value={this.state.img} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </Form>
      </div>
        : 
        <img src={Unauthorized} alt="unauthorized"/>    
      }

      </div>
        
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addProduct: product => dispatch(addProduct(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Formulario); 