import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { getProduct} from '../redux/actions';
import { connect } from "react-redux";
import Unauthorized from "../imagenes/unauthorized.jpg"

 class ModificarProducto extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name:this.props.selected.name,
        categories: [],
        deletecategories: [],
        stock:this.props.selected.stock,
        price:this.props.selected.price,
        img: this.props.selected.img,
        description: this.props.selected.description
        
}
    this.handleCheckBoxDel = this.handleCheckBoxDel.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
};
  componentDidMount(){
    this.props.getProduct(this.props.selected.id)
  }

  handleCheckBox = (selected) => {


    let index = this.state.categories.indexOf(selected.target.value);

    if (index < 0) {
      this.setState({
        ...this.state,
        categories: selected.target.checked ? this.state.categories.concat(selected.target.name) : [].concat(this.state.categories.filter(cat=>cat !== selected.target.name))//name es id de la categoria
      })} 

      else {
        this.setState({
          ...this.state
      })
    }

  }
  handleCheckBoxDel = (selected) => {


    let index = this.state.categories.indexOf(selected.target.value);

    if (index < 0) {
      this.setState({
        ...this.state,
        deletecategories: !selected.target.checked ? this.state.deletecategories.concat(selected.target.name) : [].concat(this.state.deletecategories.filter(cat=>cat !== selected.target.name))//name es id de la categoria
      })} 

      else {
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
      deletecategories: [],
      stock:"",
      price:"",
      img: "",
      description: ""
    })
  }
    ///:idProducto/category/:idCategoria
  onSubmit = (producto) =>{

    if(!producto.name&&!producto.description&&!producto.price&&!producto.stock&&!producto.img){
      alert("No está realizando ningun cambio en el producto")
    }
    else {

      var url = `http://localhost:3001/products/${this.props.selected.id}`;
      var data =  {
      name:producto.name, 
      description:producto.description, 
      price:producto.price, 
      stock:producto.stock,
      img: producto.img};
  
      fetch(url, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      .then(res => res.json())
      .catch(error => console.log(error))
      .then(response => {

          // Aquí hacemos el delete
          for(let j=0; j<producto.deletecategories.length; j++){
            var url = `http://localhost:3001/products/${this.props.selected.id}/category/${producto.deletecategories[j]}`;
          fetch(url, {
            method: 'DELETE', 
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: "include"
          }).then(res => res.json())
          .catch(error => console.log(error))
          .then(response => console.log('Success:', response));
          
          }
        

          //Aquí hacemos el Add
        for(let i=0; i<producto.categories.length; i++){
          var url = `http://localhost:3001/products/${this.props.selected.id}/category/${producto.categories[i]}`;
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
      })
      .then(()=>alert ("El producto fue modificado exitosamente"))
      .then(()=>window.location="http://localhost:3000/admin/form/modificar/")

    }
    
  }

  render() {
    return (
        
      <div>
        {this.props.user.admin===true? 
        <div>
        <h2>Modificar producto</h2>
        <Form className="container">
          <Label for="name" className='form-control'>Nombre:</Label>
          <Input type="text" name="name" id="name" placeholder={this.props.selected.name} value={this.state.name} onChange={e => this.handleInputChange(e)} />
    
          <FormGroup>
          <Label for="category" className='form-control'>Agregar a Categorias:</Label>
          {this.props.product.categories && this.props.categories.map (c =>{
              if (this.props.product.categories.some(cat => cat.id === c.id)){
                    return '';
              }
                    else 
                    return (
                      <div key={c.id} class="form-check form-check-inline">
                        <input name={c.id} class="form-check-input" type="checkbox" id="inlineCheckbox1" value={c.name} onClick={(e) => this.handleCheckBox(e)}/>
                        <label  class="form-check-label" for="inlineCheckbox1"  >{(c.name[0].toUpperCase())+(c.name.slice(1))}</label>
                      </div>)
                    })}
                    {(this.props.categories.length)===(this.props.product.categories && this.props.product.categories.length)? 'No hay categorías que agregar':''}
                
          </FormGroup>
          <FormGroup>
                <Label for="category" className='form-control'>Categorias Actuales:<span className={'red'}> Deseleccione para eliminar</span> </Label>
                      {this.props.product.categories && this.props.product.categories.map (c => (
                          <div key={c.id} class="form-check form-check-inline">
                            <input name={c.id} class="form-check-input" type="checkbox" id="inlineCheckbox1" defaultChecked={true} value={c.name} onClick={(e) => this.handleCheckBoxDel(e)}/>
                            <label  class="form-check-label" for="inlineCheckbox1"  >{(c.name[0].toUpperCase())+(c.name.slice(1))}</label>
                          </div>)
                       )} {(this.props.product.categories && !this.props.product.categories.length) ? 'Este artículo no posee categorías actualmente':''}
          </FormGroup>
        <FormGroup>
          <Label for="description" className='form-control'>Descripción:</Label>
          <Input type="text" name="description"placeholder={this.props.selected.description} id="description" value={this.state.description} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label for="stock" className='form-control'>Stock:</Label>
          <Input type="number" min={0} name="stock" placeholder={this.props.selected.stock} id="stock" value={this.state.stock} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label for="price" className='form-control'>Precio:</Label>
          <Input type="number" min={0} name="price" placeholder={this.props.selected.price} id="price" value={this.state.price} onChange={e => this.handleInputChange(e)} />
        </FormGroup>

        
        <FormGroup>
          <Label for="img" className='form-control'>Imagen:</Label>
          <Input type="text" name="img" placeholder={this.props.selected.img} id="img" value={this.state.img} onChange={e => this.handleInputChange(e)} />
        </FormGroup>
        <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Confirmar</button>
        </Form>
        </div>
        : <img src={Unauthorized} alt="unauthorized"/>
      
      }
      </div>
        
    );
  }
}

function mapStateToProps(state) {
    return {
     product:state.productDetail,
     user: state.user
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
        getProduct: id => dispatch(getProduct(id))
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ModificarProducto);