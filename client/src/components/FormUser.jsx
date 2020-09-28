import React from 'react';
import { connect } from "react-redux";
import { addUser } from '../redux/actions';
import style from './FormUser.module.css';

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
    if(!input.name){
      errors.name = "Nombre es obligatorio"
    }
    if(!input.surname){
      errors.surname = "Apellido es obligatorio"
    }

    return errors;
};

export function  FormularioUsuario(props) {
    const [input, setInput] = React.useState({
        email: '',
        password: '',
        confirmPassword:"",
        name:'',
        surname: '',
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
      console.log(user)
      if(!user.email || !user.name || !user.surname || !user.password || !user.confirmPassword){
        return alert("Todos los campos deben estar completos")
      }
      else {
        var url = `http://localhost:3001/user`;
        var data =  {
        email: user.email,
        name:user.name, 
        surname: user.surname,
        password: user.password
        };
        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(()=>alert("Usuario creado, por favor inicie sesión"))
        .catch(error => console.error('Error:', error))

        }
    }
    
    return (
        <form >
        <div className={`${style.container}`}>
            <h2>Crear nuevo usuario</h2>
            <label className={`${style.container}`} for="email">Correo electrónico:</label>
            <input  type="text" name="email" id="email" placeholder="Correo electrónico..." className={`${errors.email && 'danger'} ${style.input}`}
            onChange={handleInputChange} value={input.email} />
            {errors.email && (
            <p className="text-danger">{errors.email}</p>
            )}
        </div>
        <div>
            <label className={`${style.container}`} for="name">Nombre:</label>
            <input  type="text" name="name" id="name" placeholder="Nombre.." className={`${errors.name && 'danger'} ${style.input}`}
            onChange={handleInputChange} value={input.name} />
            {errors.name && (
            <p className="text-danger">{errors.name}</p>
            )}
        </div>
        <div>
            <label className={`${style.container}`} for="surname">Apellido:</label>
            <input  type="text" name="surname" id="surname" placeholder="Apellido.." className={`${errors.surname && 'danger'} ${style.input}`}
            onChange={handleInputChange} value={input.surname} />
            {errors.surname && (
            <p className="text-danger">{errors.surname}</p>
            )}
        </div>
        <div>
            <label className={`${style.container}`} for="password">Contraseña: (debe contener por lo menos 1 número)</label>
            <input  type="password" name="password" id="password" placeholder="Contraseña..." className={`${errors.password && 'danger'} ${style.input}`}
            onChange={handleInputChange} value={input.password} />
            {errors.password && (
            <p className="text-danger">{errors.password}</p>
            )}
        </div>
        <div>
            <label className={`${style.container}`} for="confirmPassword">Confirmar contraseña:</label>
            <input  type="password" name="confirmPassword" id="confirmPassword" className={`${errors.password && 'danger'} ${style.input}`}
            onChange={handleInputChange} value={input.confirmPassword} />
            {input.password === input.confirmPassword? "" : 
            <p className="text-danger">No coincide con su contraseña</p>
            }
            
        </div>
        <br/>
        <button type="submit" className={`${style.button}`} onClick={(e) => handleSubmit(e)}>Enviar</button>
        </form>
    )
}
function mapStateToProps(state) {
    return {
        users: state.users
    };
}
    
function mapDispatchToProps(dispatch) {
    return {
    addUser: user => dispatch(addUser(user)),
    };
}
    
export default connect(mapStateToProps, mapDispatchToProps)(FormularioUsuario); 