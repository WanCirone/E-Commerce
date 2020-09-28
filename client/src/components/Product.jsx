import React,{useState,useEffect} from 'react';
import styles from './Product.module.css';
import {addshopCart,putshopCart, getReviews} from '../redux/actions';
import { connect } from "react-redux";

 
const Product = (props) => {
    if(props.products.length)
      var {img,id,name,stock,price,description} = props.products.filter(p => p.id === Number(props.selected))[0];
      

    const [stock_rest,setStock]=useState(stock);
    const [quant,setQuant]=useState(0);


const addtoShop = () =>{

  if(!quant) return;

    if(props.user.isLogged){      // Este post resuelve el caso de AGREGAR varias veces el mismo producto
    
        var url = `http://localhost:3001/user/${props.user.id}/cart`;
        var data =  {
          price: price,
          quantity:Number(quant),
          productId: id
         };
  
      fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: "include"
        }).then(res => res.json())
        .then( added =>{
            console.log("Detalle de Orden",added)
        })
        .then(()=>{
          // Acciones correspondientes a sincronizar el carrito DB 
          console.log('Se termino de agregar al carrito')
        })
        .catch(err=>console.log(err))
    }
   
    // Aquí se inicia el impacto en el Store al agregar un producto existente(en estado GUEST quizás)

    if(props.shopCart.articles && props.shopCart.articles.filter(p=>p.productId ===id).length){
          props.putshopCart({productId:id,value:quant})
      
          setStock(Number(stock_rest)-quant);
          setQuant(0);
          document.getElementById("quantity").value = 0;
          return;
    }

      // Aquí se contempla el caso de la inexistencia del producto
  props.addshopCart({
    img:img,
    stock:stock,
    name:name,
    description,
    price:price,
    quantity:quant,
    orderId: props.shopCart.id || null,
    productId:id
  });

  // Después de todos estos sucesos, sería pertinente actualizar el LocalStorage(sólo tiene sentido si no está logueado)
  if(!props.user.isLogged){
    localStorage.setItem('shopCart',JSON.stringify(props.shopCart))

  }



  setStock(Number(stock_rest)-quant);
  console.log('Stock restante' ,stock_rest);
  document.getElementById("quantity").value = 0;


}

    return (
    <div>
      <div className= {`${styles.card} justify-content-center`}> 
         <div className={`${styles.product} `}>         
            <img className={`${styles.img}`} src={`${img}`} className="card-img-top" alt="La imagen no está disponible"/>
            <div className="card-body justify-center text-center">
                <h5 className={`${styles.title}`}>{name}</h5>
                <p className="card-text">{description} </p>
                <p className={`${styles.price}`}>Precio: ${price}</p>
                {stock_rest===0 ?
                
                <p className={`${styles.price} text-danger`}>Sin stock</p>

                :     <div className='card-body justify-center'>
                          <p className={`${styles.cant}`}>Cantidad disponible: {stock_rest}</p>
                           <input type="number" min={0}  max={stock_rest} className="input-text qty text-center" placeholder={0} id='quantity' onChange={e=>{setQuant(e.target.value)}} /> <br/>
                          <div key= 'Product' className={`${styles.buttonAdd} btn btn-secondary`} onClick={addtoShop}>Agregar al carrito</div>
                      </div>}
            </div> 
          </div> 
        </div>
    </div> 
    )
}

function mapStateToProps(state) {
    return {
      shopCart:state.shopCart,
      user: state.user,
      reviews: state.reviews,
      products: state.products 
   
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        addshopCart: (article) => dispatch(addshopCart(article)),
        putshopCart: article => dispatch(putshopCart(article)),
        getReviews: id => dispatch(getReviews(id)),
      
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Product);


  