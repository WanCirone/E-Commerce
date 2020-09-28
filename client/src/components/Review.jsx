import React from 'react';
import styles from './Review.modules.css';
import moment from 'moment';

export default function Review (props) {
  var s2;
  var s3;
  var s4;
  var s5;
  var starValue = props.rating;

  if(starValue === "5"){
    s2 = "gold";
    s3 = "gold";
    s4 = "gold";
    s5 = "gold";
   }
  if(starValue === "4") {
    s2 = "gold";
    s3 = "gold";
    s4 = "gold";
    s5 = "honeydew"
  }
  if(starValue === "3") {
    s2 = "gold";
    s3 = "gold";
    s4 = "honeydew";
    s5 = "honeydew"
  }
  if(starValue === "2") {
    s2 = "gold";
    s3 = "honeydew";
    s4 = "honeydew";
    s5 = "honeydew"
  }
  if(starValue === "1") {
    s2 = "honeydew";
    s3 = "honeydew";
    s4 = "honeydew";
    s5 = "honeydew"
  }

  return (
    <div class="card">
      <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">{props.user}</small>
        <small class="text-muted" className={styles.date} >{moment(props.createdAt).format('dddd')}</small>  
      </div>     
      <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star" style={{color: s2}}></span>
        <span class="fa fa-star" style={{color: s3}}></span>
        <span class="fa fa-star" style={{color: s4}}></span>
        <span class="fa fa-star" style={{color: s5}}></span>
      </div> 
      <span>{props.rating}</span>   
      <h4>{props.title}</h4>
      <p>{props.description}</p>       
    </div>

    )
};

