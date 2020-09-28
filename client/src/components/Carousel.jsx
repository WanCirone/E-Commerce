
import React from 'react';
import Perros1 from "../imagenes/carousel1.jpg"
import Perros2 from "../imagenes/carousel2.jpg"
import Perros3 from "../imagenes/carousel3.jpg"

export default function Carousel () {

return ( 
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active">
        <img className="d-block w-100" src={Perros1} alt="First slide"/>
        </div>
        <div className="carousel-item">
        <img className="d-block w-100" src={Perros2} alt="Second slide"/>
        </div>
        <div className="carousel-item">
        <img className="d-block w-100" src={Perros3} alt="Third slide"/>
        </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
    </a>
    </div>


)


}
