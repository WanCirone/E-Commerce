import React from 'react';
import Review from './Review.jsx';
import styles from './ReviewsContainer.modules.css';
import { getReviews } from '../redux/actions.js';
import { connect } from "react-redux";


 function ReviewsContainer(props) { 

  var total = props.reviews.length;
  var suma = 0; 
  props.reviews.map(r => {
    suma = suma + parseInt(r.rating);
  })

  var promedio = (suma/total).toFixed(1);

  var s2;
  var s3;
  var s4;
  var s5;

  if(promedio == 5){
    s2 = "gold";
    s3 = "gold";
    s4 = "gold";
    s5 = "gold";
   }
  if(promedio >= "4" && promedio < "5") {
    s2 = "gold";
    s3 = "gold";
    s4 = "gold";
    s5 = "honeydew"
  }
  if(promedio >= "3" && promedio < "4") {
    s2 = "gold";
    s3 = "gold";
    s4 = "honeydew";
    s5 = "honeydew"
  }
  if(promedio >= "2" && promedio < "3") {
    s2 = "gold";
    s3 = "honeydew";
    s4 = "honeydew";
    s5 = "honeydew"
  }
  if(promedio >= "1" && promedio < "2") {
    s2 = "honeydew";
    s3 = "honeydew";
    s4 = "honeydew";
    s5 = "honeydew"
  }
  
  var e5 = 0;
  var e4 = 0;
  var e3 = 0;
  var e2 = 0;
  var e1 = 0;

  props.reviews.map(p => {
    if(p.rating == 5) {
      e5 = e5 + 1;
    }
    if(p.rating == 4) {
      e4 = e4 + 1;
    }
    if(p.rating == 3) {
      e3 = e3 + 1;
    }
    if(p.rating == 2) {
      e2 = e2 + 1;
    }
    if(p.rating == 1) {
      e1 = e1 + 1;
    }
  })

  var bruto5 = e5.toString();
  var bruto4 = e4.toString();
  var bruto3 = e3.toString();
  var bruto2 = e2.toString();
  var bruto1 = e1.toString();

  var p5 = bruto5 * 100 / total + '%';
  var p4 = bruto4 * 100 / total + '%';
  var p3 = bruto3 * 100 / total + '%';
  var p2 = bruto2 * 100 / total + '%';
  var p1 = bruto1 * 100 / total + '%';


  return (
    <div> 
      <div class='card' className={styles.card} >
        <h2>Reseñas sobre el producto</h2>
        {props.reviews.length > 0 ?
        <div class='row'> 
          <div class='col'>
            <span style={{fontSize:'50px'}}>{promedio}</span>
            <div>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star" style={{color: s2}}></span>
              <span class="fa fa-star" style={{color: s3}}></span>
              <span class="fa fa-star" style={{color: s4}}></span>
              <span class="fa fa-star" style={{color: s5}}></span>
            </div> 
            <span>{total + " " + "reviews"}</span> 
          </div>
          <span class='col'>
            <span style={{color:"gray"}}>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <span class="fa fa-star row"> 5</span> <br/>
              <span class="fa fa-star row"> 4</span> <br/>
              <span class="fa fa-star row"> 3</span> <br/>
              <span class="fa fa-star row"> 2</span> <br/>
              <span class="fa fa-star row"> 1</span>
            </span> 
          </span>
          <div class='col'>
            <div class="rating-bar"> 
              <div class="bar-5" style={{width: p5}} ></div>
            </div>
            <div class="rating-bar">
              <div class="bar-4" style={{width: p4}}></div>
            </div>
            <div class="rating-bar">
              <div class="bar-3" style={{width: p3}}></div>
            </div>
            <div class="rating-bar">
              <div class="bar-2" style={{width: p2}}></div>
            </div>
            <div class="rating-bar">
              <div class="bar-1" style={{width: p1}}></div>
            </div>
          </div>
          </div>
          :  
        <div class='row'>
          <div class='col'>  
            <span style={{fontSize:'50px'}}>{0}</span> 
            <div>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star" style={{color: s2}}></span>
              <span class="fa fa-star" style={{color: s3}}></span>
              <span class="fa fa-star" style={{color: s4}}></span>
              <span class="fa fa-star" style={{color: s5}}></span>
            </div> 
            <span>{total + " " + "reviews"}</span> 
          </div> 
          <span class='col'>
            <span style={{color:"gray"}}>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <span class="fa fa-star row"> 5</span> <br/>
              <span class="fa fa-star row"> 4</span> <br/>
              <span class="fa fa-star row"> 3</span> <br/>
              <span class="fa fa-star row"> 2</span> <br/>
              <span class="fa fa-star row"> 1</span>
            </span> 
          </span>
          <div class='col'>
            <div class="rating-bar"> 
              <div class="bar-5" style={{width: "1%"}} ></div>
            </div>
            <div class="rating-bar">
              <div class="bar-4" style={{width: "1%"}}></div>
            </div>
            <div class="rating-bar">
              <div class="bar-3" style={{width: "1%"}}></div>
            </div>
            <div class="rating-bar">
              <div class="bar-2" style={{width: "1%"}}></div>
            </div>
            <div class="rating-bar">
              <div class="bar-1" style={{width: "1%"}}></div>
            </div>
          </div> 
        </div> 
        }
      
        {props.reviews.length == 0 ?
        <div>
          <h6 style={{textAlign:"left"}} >Este producto todavía no tiene reviews</h6>
        </div>
        : "" } 

        <div class="scroll">
          {props.reviews.length ? props.reviews.map( r => 
          <div key={'div'+ r.id} >
              <Review  
                rating={r.rating}
                title={r.title}
                description={r.description}
                createdAt={r.createdAt}
                userId={r.userId}
                user={r.user ? r.user.name : 'Not Logged'}
              />
            </div>) : "Todavía no hay reviews para este producto"}
        </div>
      </div>  
    </div>
  )}

function mapStateToProps(state) {
  return {
  reviews: state.reviews
  };
}

function mapDispatchToProps(dispatch) {
  return {
  getReviews: id => dispatch(getReviews(id))

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer); 

