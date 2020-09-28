// mostrar la orden seleccionada con su estado, sus detalles y poder modificar su estado
//fetch para traer por id y fetch para hacer put 
import React from 'react';
import { Table, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { updateOrder, getOrders } from '../redux/actions';

export default class OrderUpdate extends React.Component {

    constructor(props) {
        super(props);
          this.state = {
            id: this.props.id,
            name: this.props.name, 
            description: this.props.description, 
            userId: this.props.userId,
            quantity: this.props.quantity,
            price: this.props.price,
            status: this.props.status
            };
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();  
        this.onSubmit(this.state);
      }

      onSubmit = (order) =>{
        var url = `http://localhost:3001/orders/${this.props.id}`;
        var data =  {
        id: order.id,
        name: order.name, 
        description: order.description, 
        userId: order.userId,
        quantity: order.quantity,
        price: order.price,
        status: order.status
        }
    
        fetch(url, {
          method: 'GET', 
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          {
            var url = `http://localhost:3001/orders/${this.props.id}`;
          fetch(url, {
            method: 'PUT', 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
          }
        });
        
      }

    render () {
    return (
        <div>
            {console.log(this.state, "este es el estado")}
            <h2>Modificar orden</h2>
            <Table dark>
            <thead>
            <tr>
                <th>Id de Orden:</th>
                <th>Nombre:</th>
                <th>Descripcion:</th>
                <th>Id de usuario:</th>
                <th>Cantidad:</th>
                <th>Precio:</th>
                <th>Estado:</th>
            </tr>
            </thead>
            <tbody>
            {this.props.order.map(o => (
                <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.description}</td>
                    <th scope="row">{o.userId}</th>
                    <td>{o.quantity}</td>
                    <td>{o.price}</td>
                    <td>{o.status}
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Modificar el estado de la orden</button>    
                            <div class="dropdown-menu dropdown-primary">
                            <button class="dropdown-item" value={this.state.status} href="#" onClick={(e) => this.handleSubmit(e)}>Cancelada</button>
                            <button class="dropdown-item" value={this.state.status} href="#" onClick={(e) => this.handleSubmit(e)}>Completada</button>
                        </div>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
            
    )
}
}