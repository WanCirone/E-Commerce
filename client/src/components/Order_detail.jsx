import React,{useState} from 'react';
import { addshopCart,deleteshopCart,putshopCart} from "../redux/actions";
import { connect } from "react-redux";
import style from './Order_detail.module.css';

 
 function Order_detail(props){
    console.log(props)
    

    const {productId,price,quantity} = props;
    const {name,description,img,stock} = props.products.filter(p=>p.id === productId)[0]
    const [put,setinPut]=useState(false);
    const [quant,setQuant]=useState(quantity);

  function handledelete(){
    if (window.confirm("Esta seguro que quiere eliminar el producto?")===true){

      if(props.user.isLogged){  // En caso de LoggedIn 
    
        console.log({productId,name,stock,price,description,img})
      
          var url = `http://localhost:3001/user/${props.user.id}/cart/borrar`;
          var data =  {
          productId: productId
          };

      fetch(url, {
        method: 'DELETE', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
        }).then(res => console.log(res))
      }
      props.deleteshopCart(productId);  // DELETE del store(para no tener que esperar a la API)
    }
  }

  function handleput(variation){
    // PUT aquí irá la action correspondiente que actualice el store y en caso de isLogged:TRUE directamente impacte en la DB
      console.log('La nueva cantidad debería ser',quant);
      if(props.user.isLogged){      // Este post resuelve el caso de AGREGAR varias veces el mismo producto
    
        var url = `http://localhost:3001/user/${props.user.id}/cart`;
        var data =  {
          quantity:Number(quant),
          productId: productId
         };
  
      fetch(url, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: "include"
        }).then(res => res.json())
        .then( MODIFICADO =>{
            console.log("Detalle de Orden",MODIFICADO)
        })
        .catch(err=>console.log(err))
    }
    props.putshopCart({productId,value:variation})
  }
 
    
  

    return (
      <div className="card">
        {console.log(productId)}
      <div className="row no-gutters">
          <div className="col-sm">
              <img src={img} className="img-thumbnail rounded float-left w-50" alt=""/>
          </div>
          <div className="col">
              <div className="card-block px-2 text-center">
                  <h4 className="card-title">{name}</h4>
                  <p className="card-text">{description}</p> 
                  <span className="card-text">Cantidad a comprar:</span> 
                  <input onChange = {e=>setQuant(e.target.value)} name={`hola${productId}`} type={`number`} min={`${put? '1':quantity}`} max={`${put? stock:quantity}`} className={`${put? 'input-text disabled':'disabled'} disabled qty text-center`} placeholder={quantity} id={`hola${productId}`} /> 
                  <p className="card-text">Precio por Unidad: {"$"+price}</p>
                  <p className="card-text">Subtotal: {"$"+price*quant}</p>
                  <div className='container'>
                    <button key={`ok${productId}`}className={`${style.btnaction} ${put? 'btn-success':''} ${put? '':'d-none'} btn `}
                          onClick={()=>{
                              setinPut(false);
                              handleput(quant-quantity)}}>Ok</button>
                    <button key={`put${productId}`} className={`${style.btnaction} btn btn-warning`}onClick={()=>setinPut(true)}>Modificar Cantidad</button>
                    <button key={`delete${productId}`} className={`${style.btnaction} btn btn-danger`} onClick={handledelete}>Eliminar Artículo</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="card-footer w-100 text-muted">
         Aún quedan {stock} disponibles en stock {stock<10? <p className='text-danger'>¡¡ Apresúrate a comprarlos!!</p>:''}
      </div>
</div>
    )
}

function mapStateToProps(state) {
    return {
      shopCart:state.shopCart,
      user: state.user,
      products:state.products
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {

        addshopCart: (article) => dispatch(addshopCart(article)),
        deleteshopCart:(productId)=>dispatch(deleteshopCart(productId)),
        putshopCart:(productId)=>dispatch(putshopCart(productId))
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Order_detail);