import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUsers } from '../redux/actions';
import store from '../redux/store';
import Unauthorized from "../imagenes/unauthorized.jpg"

class UsersTable extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount = () => {
      store.dispatch(getUsers())
    }
    booleanIntoWords(x){
      if(x === false){
          return "NO"
      }
      else return "SI"
    }
    render() {
    return (
        <div className="table-responsive">
          {this.props.user.admin===true?
          <div>
            <h2>Usuarios</h2>
            <Table dark table table-hover>
            <thead>
            <tr>
                <th>Id:</th>
                <th>Correo electronico:</th>
                <th>Nombre:</th>
                <th>Apellido:</th>
                <th>Banneado:</th>
                <th>Es admin:</th>
            </tr>
            </thead>
            <tbody>
              {this.props.users.length && this.props.users.map(i => (
            <tr key={i.id}>
                <td>{i.id}</td>
                <th>{i.email}</th>
                <td>{i.name}</td>
                <td>{i.surname}</td>
                <td>{this.booleanIntoWords(i.banned)}</td>
                <td>{this.booleanIntoWords(i.admin)}</td>
                <td><Link class="btn btn-secondary" to={`/admin/form/users/${i.id}`} name={i.id}>Ver más</Link></td>
            </tr>
              ))}
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
    users: state.users,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);