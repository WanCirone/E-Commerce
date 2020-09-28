import React from 'react';
import s from  './ProductCard.module.css';
import  {Link} from 'react-router-dom';

export default class ProductCard extends React.Component{
    constructor(props) {
        super(props);
          this.state = {
            id:this.props.id,
            stock:this.props.stock,
            name:this.props.name,
            description:this.props.description,
            price:this.props.price,
            img:this.props.img
    };

        this.handleSubmit = this.handleSubmit.bind(this);

    };
        handleSubmit = (e) => {
            e.preventDefault();  
            this.onSubmit(this.state)
            }

    render(){
    return (

        <div className={`${s.card} ${s.img} justify-content-center`} >
            <div className={`${s.product}`}>
            <Link to={`/products/${this.props.id}`} >
                <h5 className="card-title" >{this.props.name}</h5>
            </Link>
            <img className="card-img-top" src={this.props.img} alt="Image producto" />
            <p className="card-text">{this.props.description}</p>
            <p className={`${s.price}`}>${this.props.price}</p>
            {this.props.stock===0? <p className={`${s.price} text-danger`}>Sin stock</p>
            :<Link className="btn btn-danger" to={`/products/${this.props.id}`}>Lo quiero!</Link>
            }
            
        </div>
      </div>
    )
}
}