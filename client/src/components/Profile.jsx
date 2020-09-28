import React from 'react';
import { connect } from "react-redux";
import u from "./Profile.module.css"
import { Link } from "react-router-dom"

  export function Profile(props) {

    function deleteUser() {
      if (window.confirm("Desea eliminar su cuenta?") === true){

      var url = `http://localhost:3001/user/${props.user.id}`;
      var data = {
        banned: true
      }
      fetch(url, {
      method: 'PUT', 
      body: JSON.stringify(data),
      headers:{
          'Content-Type': 'application/json'
      } , credentials: "include"
      })
      .then(res => res.json())
      .then(() => alert("Cuenta eliminada con éxito"))
      .then(() => {window.location.reload()})
      .catch(error => console.error('Error:', error))
      console.log("esta es la data", data)
      }
    else {
      return
    }
      var url = "http://localhost:3001/logout";
      fetch(url, {
      method: 'GET', 
      headers:{
          'Content-Type': 'application/json'
      } , credentials: "include"
      })
      .then(res => res.json())
      .catch(error => console.log("Error:", error))
  }


    return (
      <div className="jumbotron">
      <div className={`${u.container}`}>
        <div className={`${u.img}`}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6e3HMzWullxWyCbMl3xUvT6qTXGRVL8NTLg&usqp=CAU" class="rounded float-left" alt="Imagen de perfil" />
        </div>
    
        <div className={`${u.textContaint}`} className="offset-1">
          <h1 className={`${u.title}`}>Mi Perfil</h1>
          <hr class="my-4"/>
          <h4>Nombre y apellido:</h4>
          <p className={`${u.text}`}>{props.user.name} {props.user.surname}</p>
          <h4>Correo electrónico:</h4>
          <p className={`${u.text}`}> {props.user.email}</p>
    
          <div >
          <Link className="btn btn-secondary" to="/user/perfil/orders">Ver órdenes</Link>
          <Link className="btn btn-secondary"  to="/user/perfil/passwordReset">Cambiar contraseña</Link>
          <Link onClick={deleteUser} className="btn btn-danger" to="/auth/login">Eliminar cuenta</Link>
          </div>
        
        </div>
      </div>
      </div>
    )
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
      orders: state.orders
    };
  }

  export default connect(mapStateToProps)(Profile);