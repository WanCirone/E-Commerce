import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Style from './StarRating.modules.css';
import { addReview } from '../redux/actions';
import { connect } from "react-redux";


    function StarRating (props) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [input, setInput] = useState({
        title: '',
        description: '',
      });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = function(e) {
        e.preventDefault();
        onSubmit(input, rating);
      }


    const onSubmit = (input, rating) =>{
        var url = `http://localhost:3001/products/${props.id}/review`;
        var data =  {
        title: input.title,
        description: input.description, 
        rating: rating,
        userId: props.user.id
      };
        fetch(url, {
          method: 'POST', 
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(json => {
          addReview(json)
        })
        .then(()=>alert("Review enviada con éxito!"))
        .catch(error => console.error('Error:', error))      
      }

 
        return (
            <form className='form' >
                <div className='p'>
                    <p>¿Qué te pareció el producto?</p>
                </div>
                <div>
                {[...Array(5)].map( (star,i) => {
                    const ratingValue = i + 1;
                    return (
                        <label>
                            <input className='input' type='radio' name='rating' value={ratingValue} onClick={() => setRating(ratingValue)} />
                            <FaStar className='star' color={ratingValue <= (hover || rating) ? '#ffc107' : 'e4e5e9' } size={50}
                            onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
                        </label>
                    )
                })}
                </div> 
                <div>
                <div class="form-group">
                    <label>Título</label>
                    <input type="text" name='title' class="form-control" placeholder='Contanos en pocas palabras qué te pareció el producto...' value={input.title} onChange={handleInputChange} />
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <input type="text" name='description' class="form-control" placeholder='Contanos con más detalle sobre el producto, lo recomendarías?' value={input.description} onChange={handleInputChange} />
                </div>
                <div type="submit" className={`${Style.buttonAdd} btn btn-primary`} onClick={handleSubmit}>Enviar</div>
                </div>
            </form>
        )} 


    function mapStateToProps(state) {
        return {
            user: state.user
        };
    }
        
    function mapDispatchToProps(dispatch) {
        return {
            addReview: user => dispatch(addReview(user)),
        };
    }
    
export default connect(mapStateToProps, mapDispatchToProps)(StarRating); 