import React from 'react';
import { connect } from "react-redux";
import Logo from '../imagenes/logo.jpg';
import { Link} from 'react-router-dom';
import f from './SearchBar.module.css'
import {getArticles, searchProduct, login, logout, dbSync } from '../redux/actions';

export function SearchBar (props) {


function logOut(){
    var url = `http://localhost:3001/logout`;
    fetch(url, {
    method: 'GET', 
    headers:{
        'Content-Type': 'application/json'
    },
    credentials: "include"
    })
    .then(() => {
        props.logout();
        window.location="http://localhost:3000/";
    })
    
    
}




    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <img src={Logo} alt="logo"/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/products">Productos<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#categorias" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categorias
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                        { props.categories ? props.categories.map(p =>
                          <Link  className="dropdown-item" key={`${p.name}`} to= {`/products/category/${p.name}`}>{p.name[0].toUpperCase()+p.name.slice(1) }</Link>) :'' }
                    </div>
                </li>
                {props.user.admin===true?
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#admin" id="navbarAdmin" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarAdmin" id="admin">
                          <Link  className="dropdown-item" to='/admin/form/borrar'>Eliminar productos</Link>
                          <Link  className="dropdown-item" to='/admin/form/agregar'>Agregar productos</Link>
                          <Link  className="dropdown-item" to='/admin/form/modificar'>Modificar productos</Link>
                          <Link  className="dropdown-item" to='/admin/form/categoria'>Agregar categoria</Link>
                          <Link  className="dropdown-item" to='/admin/orders'>Ver órdenes</Link>
                          <Link  className="dropdown-item" to='/admin/form/users'>Ver usuarios</Link>
                    </div>
                </li>
            :""}
            </ul>


                <form  className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2 col" type="text" placeholder="Buscar.." aria-label="Search"
                                                                        onChange={e => props.searchProduct(e.target.value)}/>
                    <Link to={`/products`} className={`${f.btnsearch} btn btn-outline-warning my-2 my-sm-0`} type="submit">Search</Link>
                    

                    <Link to='/user/shopCart' className={`${f.btncarrito} btn-${props.user.isLogged? 'success':'danger'} btn`} type="button"  title="Quick Shop"><i className="fa fa-shopping-cart"></i></Link>
                    <span className={`${f.numero} badge badge-dark`}> {props.articles.length} </span>
                    
                </form>




{/*  

                               Si estas  buscando el Login y Register, comienzan Aquí xD

*/}

                <div className={`${f.loginmargin}`}>
                    {props.user.isLogged===false ?
                    <ul className='navbar-nav mr-auto'>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/auth/login">Iniciar Sesión<span className="sr-only">(current)</span></Link>
                        </li> 
                        <li className="nav-item active">
                            <Link className="nav-link" to="/user/form/agregar">Registrate<span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    :
                    <ul className='navbar-nav mr-auto'>
                        <li className="dropdown">
                            <a className={`${f.profile} btn btn-secondary nav-link dropdown-toggle`} href="#" id="user" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user" ></i>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarProfile" id="perfil">
                                <Link  className="dropdown-item" to='/user/perfil'>Mi perfil</Link>
                                <Link  className="dropdown-item" onClick={()=>logOut()} to='/'>Cerrar sesión</Link>
                            </div>
                        </li>
                    </ul> 
                    }
                </div>
            </div>
        </nav>
    )
}
    
function mapStateToProps(state) {
    return {
      products: state.products,
      categories:state.categories,
      user:state.user,
      articles:state.shopCart.articles,
      shopCart:state.shopCart
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
        searchProduct: product => dispatch(searchProduct(product)),
        login: email => dispatch(login(email)),
        logout: () => dispatch(logout()),
        dbSync: details => dispatch(dbSync(details)),
        getArticles: id => dispatch(getArticles(id))
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);