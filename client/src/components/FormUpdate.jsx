import React from 'react';
import { Table } from 'reactstrap';
import {Link } from 'react-router-dom'
import Unauthorized from "../imagenes/unauthorized.jpg"
import { connect } from "react-redux";

//formulario para modificar producto-SE ABRE EL COMPONENTE "ModificarProducto"
 function TablaModificarProducto (props) {

    return (
        <div> 
            {props.user.admin===true? 
            <div>
            <h2>Modificar producto</h2>
            <Table dark>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Modificar</th>
            </tr>
            </thead>
            <tbody>
            {props.array.map(p=> (
            <tr key={p.id}>
                <th scope="row">{p.name}</th>
                <td>{p.description}</td>
                <td>{p.stock}</td>
                <td>{"$"+p.price}</td>
                <td><Link to= {`/admin/form/modificar/${p.id}`} name={p.id}>Modificar</Link></td>
            </tr>
            ))}
            </tbody>
            </Table>
            </div>
            : 
            <img src={Unauthorized} alt="unauthorized"/>
        
        }
        </div>
            
    )
}


function mapStateToProps(state) {
    return {
     user: state.user
    };
  }


  export default connect(mapStateToProps)(TablaModificarProducto);