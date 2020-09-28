import React from 'react';
import { Table } from 'reactstrap';
import Unauthorized from "../imagenes/unauthorized.jpg"
import { connect } from "react-redux";

//formulario para eliminar producto
function eliminarProducto (props) {
    
    function onClick (e){
    
        if (window.confirm("Desea eliminar el registro?") === true){
            
            var url = `http://localhost:3001/products/${e.target.id}`
            fetch(url, {
                method: 'DELETE', 
                headers:{
                'Content-Type': 'application/json'
                },
                credentials: "include"
            }).then(res => res.json())
            .then(res => console.log(res))
    
            .then(()=> alert("El producto fue borrado exitosamente"))
            .then(()=> {
            window.location.reload();
            return false;
            })
            .catch(error =>console.error("no se puede"))

        }
        else return

    }



    return (
        <div>
        {props.user.admin===true?
        <div>
            <h2>Eliminar producto</h2>
            <Table dark>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Borrar</th>
            </tr>
            </thead>
            <tbody>
            {props.array.map(p=> (
            <tr key={p.id}>
                <th scope="row">{p.name}</th>
                <td>{p.description}</td>
                <td>{p.stock}</td>
                <td>{"$"+p.price}</td>
                <td><div id={p.id} class="btn btn-secondary" onClick={(e)=>onClick(e)}>Borrar</div></td>
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


  export default connect(mapStateToProps)(eliminarProducto);