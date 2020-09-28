import React, { useState } from 'react';
import { getProduct, clearshopCart,completeshopCart, login,dbSync} from '../redux/actions';
import { connect } from "react-redux";
import Order_detail from './Order_detail';
import style from './Carrito.module.css';
import { Link } from 'react-router-dom';   


export function Carrito(props) {


  // function handleBuy(){
  //  //"localhost:3001/orders"
  //   if(props.user.isLogged){
  //       var url = `http://localhost:3001/orders/${props.shopCart.id}`;

  //       var data =  {
  //           status:"completed"
  //       };

  //       fetch(url, {
  //         method: 'PUT', 
  //         body:JSON.stringify(data),
  //         headers:{
  //           'Content-Type': 'application/json'
  //         }
  //         }).then(r=>r.json())
  //         .then((order)=>{
  //           console.log(order.userId);
  //           props.completeshopCart();


        
  //           let url = `http://localhost:3001/orders`;
  //           let data =  {
  //             userId:order.userId
  //            };
      
  //         fetch(url, {
  //           method: 'POST', 
  //           body: JSON.stringify(data),
  //           headers:{
  //             'Content-Type': 'application/json'
  //           }
  //           }).then(res=>res.json()).then(shopCartdetails=>{
  //               props.dbSync(shopCartdetails)
  //               console.log('Detallles del shopCart',shopCartdetails)
  //               return shopCartdetails
  //           }).catch(err => console.log(err))

  //         })
         

  //    }
  //     else
  //       alert("Debes primero crear una cuenta :D")


  // }

  function handleClear(){
    
    if(props.user.isLogged){
      var url = `http://localhost:3001/user/${props.user.id}/cart`;
   
    fetch(url, {
      method: 'DELETE', 
      headers:{
        'Content-Type': 'application/json'
      }
      })
        .then(()=>console.log('Borrado con exito'))
        .catch(err=>console.log(err));
    }
    props.clearshopCart();
  }

  function totalidad(articles){
    var nuevo = articles.map ((a)=> a.price*a.quantity)
    let total = nuevo.reduce((a, b) => a + b, 0);
    return " $"+total
  }

  return (
    <div className="container">
      <div className="column" >

                  {props.shopCart.articles ? props.shopCart.articles.map(p =>
                          <div key={'div'+p.id} className="col-sm container">
                                <Order_detail key={p.id} {...p}  />
                          </div>):''
                  }
                  
                  <div className={`${style.hiden}`}>{props.shopCart.articles.length !== 0 ? 
                  <div className="column container">
                    <p>Total de la compra: {totalidad(props.shopCart.articles)}</p>
                    <button key={'Clear'} className={`${style.btnaction} btn btn-danger`} onClick={handleClear}>Eliminar carrito</button>
                    <Link className="btn btn-success" to={ props.user.isLogged ? "/auth/checkout" : "/user/form/agregar"}>Comprar<span className="sr-only">(current)</span></Link>
                  </div>
                  : 'El Carrito está vacío.'}</div>
    </div>
  </div>
  )
}


function mapStateToProps(state) {

      return {
        shopCart:state.shopCart,
        user: state.user,
     
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
          getProduct: (id) => dispatch(getProduct(id)),
          clearshopCart:()=> dispatch(clearshopCart()),
          completeshopCart:()=> dispatch(completeshopCart()),
          dbSync: details => dispatch(dbSync(details)),
          login:(email)=>dispatch(login(email))
      };
    }
  
    export default connect(mapStateToProps, mapDispatchToProps)(Carrito);