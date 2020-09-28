import React from 'react';
import style from './NoFound.module.css';
import patita from "../imagenes/patita.png";

export default () =>
<div className= 'container'>

<div className ='row'>
 <h1>Cargando... </h1>
     </div>  
    <div className ='row'>
    <img className={style.image} src={patita} alt="" width="120" height="120"/> 
    </div>   
  
</div>


