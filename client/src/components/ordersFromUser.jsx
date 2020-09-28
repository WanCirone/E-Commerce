import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { getOrdersFromUser } from '../redux/actions';
import { ordersFromUser } from '../redux/reducer';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

 class ordersUser extends React.Component{
  constructor(props) {
    super(props);
  }

componentDidMount(){
  this.props.getOrdersFromUser(this.props.user.id);
}

render(){

  return (
        <div>
            <h2>Mis órdenes</h2>
            <Table dark>
            <thead>
            <tr>
                <th>Código de Orden:</th>
                <th>Fecha de creación:</th>
                <th>Ultima fecha de modificación:</th>
                <th>Más info</th>
            </tr>
            </thead>
            <tbody>
            {this.props.ordersFromUser && this.props.ordersFromUser.map(o => (
            <tr key={o.id}>
                <td>{"#"+o.id}</td>
                <th scope="row">{o.createdAt.split("T")[0]}</th>
                <td>{o.updatedAt.split("T")[0]}</td>
                <Link to={"/user/perfil/orders/" + o.id} className="btn btn-secondary">Ver detalles</Link>
            </tr>
            ))}
            </tbody>
            </Table>
        </div>
    )
}
}

function mapStateToProps(state) {

  return {
    ordersFromUser: state.ordersFromUser,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrdersFromUser: (id) => dispatch(getOrdersFromUser(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ordersUser);