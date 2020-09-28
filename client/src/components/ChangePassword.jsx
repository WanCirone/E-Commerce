import React from 'react';
import { connect } from "react-redux";
import style from './changePassword.module.css';


export function validate(input) {

    let errors = {};
    if (!input.newPassword) {
        errors.newPassword = 'Contraseña es obligatoria';
    } else if (!/(?=.*[0-9])/.test(input.newPassword)) {
        errors.newPassword = 'Contraseña inválida';
    }

    return errors;
};

export function ChangePassword(props) {
    const [input, setInput] = React.useState({
        newPassword: '',
        confirmPassword: ''

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

        if(!user.newPassword){
            return alert("Todos los campos deben estar completos")
        }
        else {
            console.log(props.user.id, user.newPassword)
            var url = `http://localhost:3001/user/${props.user.id}`;
            var data =  {
            password: user.newPassword
            };
            fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include"
            })
            .then(res => res.json())
            .then(res => {
                if(res){
                    alert("Su contraseña fue modificada correctamente")
                }
                else alert("Cambio de contraseña fallida")
            })
            .catch(error => alert("No existe la cuenta o está banneada"))

        }
    }


    return (
            <div className={`${style.container}`}>

            <form action="/login" method="PUT">
            <h3>Modificar contraseña</h3>
            <div>
                <label className={`${style.container}`} for="newPassword">Nueva contraseña: <br/> (debe contener por lo menos 1 número)</label><br/>
                <input class={`${style.input}`} type="password" name="newPassword" id="newPassword" placeholder="Contraseña..." className={`${errors.newPassword && 'danger'}`}
                onChange={handleInputChange} value={input.newPassword} />
                {errors.newPassword && (
                <p className="text-danger">{errors.newPassword}</p>
                )}
            </div>
            <div>
                <label className={`${style.container}`} for="confirmPassword">Confirmar contraseña:</label><br/>
                <input class={`${style.input}`} type="password" name="confirmPassword" id="confirmPassword" className={`${errors.newPassword && 'danger'}`}
                onChange={handleInputChange} value={input.confirmPassword} />
                {input.newPassword === input.confirmPassword? "" : 
                <p className="text-danger">No coincide con su contraseña</p>
                }
                
            </div>
                
                <br/>
                        <button className={`${style.button}`} type="submit" onClick={(e) => handleSubmit(e)}>Enviar</button>
                </form>

                </div>

        )}



 function mapStateToProps(state) {
        return {
        user: state.user
        };
    }



    export default connect(mapStateToProps)(ChangePassword);
