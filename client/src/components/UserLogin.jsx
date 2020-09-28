import React from 'react';
import { connect } from "react-redux";
import { login, dbSync, getArticles } from '../redux/actions';
import style from './UserLogin.module.css';
export function validate(input) {

    let errors = {};
    if (!input.email) {
        errors.email = 'Email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'Email inválido';
    }
    if (!input.password) {
        errors.password = 'Contraseña es obligatoria';
    } else if (!/(?=.*[0-9])/.test(input.password)) {
        errors.password = 'Contraseña inválida';
    }

    return errors;
};

function  UserLogin(props) {
    const [input, setInput] = React.useState({
        email: '',
        password: ''


    });
    const [errors, setErrors] = React.useState({});


    const handleInputChange = function(e) {
        setInput({
        ...input,
        [e.target.name]: e.target.value
        });
        setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = function(e) {
        e.preventDefault();
        onSubmit (input);
    }


    const onSubmit = function (user){

      if(!user.email || !user.password){
        return alert("Todos los campos deben estar completos")
      }
      else {
        var url = `http://localhost:3001/login`;
        var data =  {
        email: user.email,
        password: user.password
        };
        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: "include"
        })
        .then(res => res.json())
        .then(res => {
            if(res){
                console.log(res);
                alert("Inicio de sesión exitoso")
                props.login(res)
                props.dbSync(res.id)
                .then(id =>  props.getArticles(id))
                .then((casse)=>{
                    console.log(casse.slice(0,-1))
                    switch (casse.slice(0,-1)){
                        case 'TRANSLATE':
                            console.log('Redux User actual',props.user)
                            
                           for(let i = 0;i<props.articles.length;i++){
                            let url = `http://localhost:3001/user/${casse.slice(-1)}/cart`;
                            let data =  {
                            price: props.articles[i].price,
                            quantity:Number(props.articles[i].quantity),
                            productId: props.articles[i].productId
                            };
                                console.log('DATAAAAA',data)
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
                            .catch(err=>console.log(err))
                        }
                        case 'ACTUAL_SHOPCART': // Requiere limpiar previamente la BD
                            let url = `http://localhost:3001/user/${res.id}/cart`;
                            console.log('Borrado con exito',res.id)
                          fetch(url, {
                            method: 'DELETE', 
                            headers:{
                              'Content-Type': 'application/json'
                            } ,
                            credentials: "include"
                            }).then(()=>{
                                     
                                    for(let i = 0;i<props.articles.length;i++){
                                        let url = `http://localhost:3001/user/${casse.slice(-1)}/cart`;
                                        let data =  {
                                        price: props.articles[i].price,
                                        quantity:Number(props.articles[i].quantity),
                                        productId: props.articles[i].productId
                                        };
                                            console.log('DATAAAAA',data)
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
                                        .catch(err=>console.log(err))
                                    }

                            })
                           
                              .catch(err=>console.log(err));
                          
                          
                        
                    }

                }) 
                
            }
            else alert("No existe la cuenta")
        })
        .catch(error => alert("No existe la cuenta o está banneada"))

        }
    }


    return (
            <div className={`${style.container}`}>

            <form action="/login" method="POST">
                <div>
                    <h2 className={`${style.title}`}>Iniciar Sesión</h2>
                        <label for="email" className='form-control' className={`${style.container}`}>Correo electrónico:</label>
                            <input type="text" name="email" id="email" placeholder="Correo electrónico..." className={`${errors.email && 'danger'}`}
                            onChange={handleInputChange} value={input.email} />
                            {errors.email && (
                            <p className="text-danger">{errors.email}</p>
                    )}
                </div>
                <div>
                        <label for="password" className='form-control' className={`${style.container}`}>Contraseña: </label>
                            <input  type="password" name="password" id="password" placeholder="Contraseña..." className={`${errors.password && 'danger'} ${style.input}`}
                            onChange={handleInputChange} value={input.password} />
                            {errors.password && (
                            <p className="text-danger">{errors.password}</p>
                    )}
                </div><br/>
                        <button className={`${style.button}`} type="submit" onClick={(e) => handleSubmit(e)}>Enviar</button>
                </form>

                </div>

        )}



 function mapStateToProps(state) {
        return {
        user: state.user,
        articles: state.shopCart.articles
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            login: user => dispatch(login(user)),
            dbSync: id => dispatch(dbSync(id)),
            getArticles: id => dispatch(getArticles(id))
        };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
