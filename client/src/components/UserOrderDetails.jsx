
import React from 'react';
import { connect } from "react-redux";
import { getDetailsOfOrder} from '../redux/actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserOrderDetails extends React.Component {
    constructor(props) {
    super(props);


        this.totalidad = this.totalidad.bind(this);
    }
    totalidad= (detalles)=>{
        var nuevo = detalles.map ((a)=> a.price*a.quantity)
        let total = nuevo.reduce((a, b) => a + b, 0);
        return " $"+total
    }
    

    componentDidMount(){
        this.props.getDetailsOfOrder(this.props.id)
    }
    
    

    render(){
        return (
        <div className= "container"> 
            <div>
                {console.log(this.props.userOrderDetail)}
            <div className= "row">
            <div class="jumbotron col">
                <h3 class="display-4">Datos de la orden</h3>
                <p class="lead">Order ID = # {this.props.userOrderDetail.id}</p>
                <p class="lead">Fecha de compra = {moment(this.props.userOrderDetail.updatedAt).format('LLL')}</p>
                {this.props.userOrderDetail.order_details?
                <p class="lead">Total de la compra =  {this.totalidad(this.props.userOrderDetail.order_details)}</p>
                :<p class="lead">Total = 0$</p>
                }
            </div>

            <div className="w-75 p-3 col" >
                <h5>Detalle de orden</h5>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio x unidad</th>
                <th scope="col">Subtotal</th>
                </tr>
            </thead>
            <tbody>{this.props.userOrderDetail.order_details && this.props.userOrderDetail.order_details.map ((detail)=>

                <tr>
                <th scope="row"><Link to={`/products/${detail.productId}`}>{detail.product.name}</Link></th>
                <td>{detail.quantity}</td>
                <td>{"$"+ detail.price}</td>
                <td>{`${"$"+detail.price*detail.quantity}`}</td>
                </tr>
            )}
            </tbody>
            </table>
            </div>



            
            </div>
            </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
        return {
            userOrderDetail: state.userOrderDetail
        };
    }
    
    function mapDispatchToProps(dispatch) {
        return {
        getDetailsOfOrder: id => dispatch(getDetailsOfOrder(id))
    
        };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(UserOrderDetails); 
