
import React from 'react';
import { connect } from "react-redux";
import { getOrder} from '../redux/actions';
import { Link } from 'react-router-dom';
class ModificarOrden extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            status: this.props.order.status
        }
        this.changeState = this.changeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.totalidad = this.totalidad.bind(this);
    }
    totalidad= (detalles)=>{
        var nuevo = detalles.map ((a)=> a.price*a.quantity)
        let total = nuevo.reduce((a, b) => a + b, 0);
        return " $"+total
    }
    
    // fecha=(fecha)=>{
    //     fecha.split("T")
    // }
    changeState = (e) =>{
        this.setState({
            status: e
        })
    }

    componentDidMount(){
        this.props.getOrder(this.props.id)
    }
    
    handleSubmit(e){
        console.log(this.props.id)
        var id= this.props.id
        var url=`http://localhost:3001/orders/${id}`
        fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
    

    render(){
        return (
        <div className= "container">
            {this.props.order.user?<div>
            <div className= "row">
            <div class="jumbotron col">
                <h3 class="display-4">Datos de la orden</h3>
                <p class="lead">Order ID = # {this.props.order.id}</p>
                <p class="lead">Comprador = {this.props.order.user.name} {this.props.order.user.surname}</p>
                <p class="lead">Fecha de creación =  {this.props.order.createdAt.split("T")[0]}</p>
                <p class="lead">Email =  {this.props.order.user.email}</p>
                <p class="lead">Estado de orden =  {this.props.order.status}</p>
                {this.props.order.order_details?
                <p class="lead">Total =  {this.totalidad(this.props.order.order_details)}</p>
                :<p class="lead">Total = 0$</p>
                }
                <form id="status" onSubmit={(e)=>this.handleSubmit(e)}>
                    <label for="status" class="lead">Modificar estado de orden</label>
                    <br/>
                    <select onChange={(e) => this.changeState(e.target.value)} name="estados">
                    <option key="cart" value="cart"> cart </option>
                    <option key="created" value="created"> created </option>
                    <option key="processing" value="processing"> processing </option>
                    <option key="cancelled" value="cancelled"> cancelled </option>
                    <option key="completed" value="completed"> completed </option>
                    </select>
                </form>
                    <button className="btn btn-secondary" type="submit" form="status" value="Submit" >Confirmar</button>
                    
            </div>
            
            <div className="w-75 p-3 col" >
                <h5>Detalle de orden</h5>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio x unidad</th>
                <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>{this.props.order.order_details.length!=0?this.props.order.order_details.map ((detail)=>

                <tr>
                <th scope="row"><Link to={`/products/${detail.productId}`}>{detail.product.name}</Link></th>
                <td>{detail.quantity}</td>
                <td>{"$"+ detail.price}</td>
                <td>{`${"$"+detail.price*detail.quantity}`}</td>
                </tr>
            ):<tr><td scope="col">No hay detalles</td></tr>}
            </tbody>
            </table>
            </div>
            </div>
            </div>:""}
        </div>
        )
    }

}

function mapStateToProps(state) {
        return {
        order: state.order
        };
    }
    
    function mapDispatchToProps(dispatch) {
        return {
        getOrder: id => dispatch(getOrder(id))
    
        };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(ModificarOrden); 
