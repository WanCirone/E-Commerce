import React from 'react';
// import { Container, Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';


export default  (props) => {
    
    return (
        <div>
            <h2>Modificar o eliminar producto</h2>
            <Table dark>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Modificar</th>
                <th>Guardar</th>
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
                <td><button onClick={()=>props.onClick}>Modificar</button></td>
                <td><button onClick={()=>props.onClick}>Guardar</button></td>
                <td><button onClick={()=>props.onClick}>Borrar</button></td>
            </tr>
            ))}
            </tbody>
            </Table>
        </div>
            
    )
}
