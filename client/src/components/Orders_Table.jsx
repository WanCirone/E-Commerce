import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getOrders } from '../redux/actions';
import Unauthorized from "../imagenes/unauthorized.jpg";
import s from './Orders_Table.modules.css';
import NoMatch from './NoMatch'


class OrdersTable extends React.Component {
    
    constructor(props) {
        super(props);
          this.state = {
            id: this.props.id,
            userId: this.props.userId,
            status: this.props.status,
            filteredOrders: this.props.orders
            };  
      
      this.cart = this.cart.bind(this);
      this.created = this.created.bind(this);
      this.processing = this.processing.bind(this);
      this.cancelled = this.cancelled.bind(this);
      this.completed = this.completed.bind(this);
      this.all = this.all.bind(this);
      this.searchId = this.searchId.bind(this);
    };

    cart() {
      var cart = this.props.orders.filter( o => o.status === "cart");
      this.setState({filteredOrders:cart});
    };
    created() {
      var created = this.props.orders.filter( o => o.status === "created");
      this.setState({filteredOrders:created});
    };
    processing() {
      var processing = this.props.orders.filter( o => o.status === "processing");
      this.setState({filteredOrders:processing});
    };
    cancelled() {
      var cancelled = this.props.orders.filter( o => o.status === "cancelled");
      this.setState({filteredOrders:cancelled});
    };
    completed() {
      var completed = this.props.orders.filter( o => o.status === "completed");
      this.setState({filteredOrders:completed});
    };
    all() {
      var all = this.props.orders;
      this.setState({filteredOrders:all});
    };
    searchId(id) {
      let i = this.props.orders.filter( o => o.id == id);
      this.setState({filteredOrders:i});
    };


    render() {
    return (
      <div>
      {this.props.user.admin===true? 
        <div>
            {console.log(this.state)}
            <h2>Tabla de ordenes</h2>
            <Table dark>
            <thead>
            <tr>
              <th>Código de Orden</th>
              <th>Código de Usuario</th>
              <th>
                <a class="nav-link dropdown-toggle" id="navbarEstado" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Estado
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarEstado" id="Estado">
                  <Link className="dropdown-item" onClick={this.cart}>Cart</Link>
                  <Link className="dropdown-item" onClick={this.created}>Created</Link>
                  <Link className="dropdown-item" onClick={this.processing}>Processing</Link>
                  <Link className="dropdown-item" onClick={this.cancelled}>Cancelled</Link>
                  <Link className="dropdown-item" onClick={this.completed}>Completed</Link>
                  <Link className="dropdown-item" onClick={this.all}>All</Link>
                </div>
              </th>
              <th>Modificar</th>
              <th>Despachada</th>
              <th>Filtrar por Código de Orden 
                <input size="5" onChange={e => this.searchId(e.target.value)}/>
              </th>
            </tr>
            </thead>
            <tbody>
            {this.state.filteredOrders.length ? this.state.filteredOrders.map(o=> (
            <tr key={o.id}>
                <td>{"#"+o.id}</td>
                <th scope="row">{o.userId}</th>
                <td>{o.status}</td>
                <td><Link class="btn btn-secondary" to={`/admin/orders/${o.id}`} name={o.id}>Modificar</Link></td>
                {o.status === "completed" ? 
                <td><div type="button" class="btn btn-success"> ✓ </div></td> 
                : 
                <td><div type="button" class="btn btn-danger"> X </div></td>}
            </tr>
            )) : <NoMatch/> }
            </tbody>
            </Table>
        </div>    
        : <img src={Unauthorized} alt="unauthorized"/>
      }
      </div>
    )}
}

function mapStateToProps(state) {
    return {
      orders: state.orders,
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getOrders: () => dispatch(getOrders()),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);