import React,{useEffect,useState} from 'react';
import ReviewsContainer from './ReviewsContainer';
import StarRating from './StarRating';
import Product from './Product';
import {getReviews} from '../redux/actions';
import { connect } from "react-redux";


function Container(props)  { 

    useEffect(()=>{
       // console.log('Obteniendo Reviews');
        props.getReviews(props.selected);
        
    },[props.reviews.length])

    useEffect(()=>{
       console.log('Guardando en Localstorage',props.shopCart);
        window.localStorage.setItem('shopCart',JSON.stringify(props.shopCart))
    },[props.shopCart])
            
 
    return (
        <div>
            <div class="row" >
                <div class='col'>   
                    {props.selected ? <Product selected={props.selected}/>: ''}
                    {props.user.isLogged === true ? 
                    <div>
                        <StarRating id={props.selected} />
                    </div> : '' }
                </div>
                <div class="col">
                    <div>
                        <ReviewsContainer id={props.selected}/>
                    </div>
                </div>
            </div>
        </div>
    )

 }


function mapStateToProps(state) {
    return {
      products: state.products,
      user: state.user,
      reviews: state.reviews,
      shopCart:state.shopCart
   
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getReviews: id => dispatch(getReviews(id))
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Container);


