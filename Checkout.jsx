import React from 'react';
import { checkOut, completeshopCart, dbSync } from '../redux/actions';
import { connect } from 'react-redux';
import style from './Checkout.module.css';

export class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailShipment: "",
            street: "",
            number: "",
            apartment: "",
            city: "",
            cp: "",
            province: "",
            country: ""
        }

        this.handleCheckout = this.handleCheckout.bind(this)
        this.setInput = this.setInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleCheckout = () => {
        var url = `http://localhost:3001/orders/${this.props.shopCart.id}`;
        var data =  {
            status:"processing" 
        };
        fetch(url, {
            method: 'PUT', 
            body:JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(r => r.json())
        .then((order) => {
            this.props.completeshopCart(); 
        }).catch(err => console.log(err))    
    }


    setInput = e => {
        const value = e.target.value;
        const id = e.target.id;
        this.setState({
            [id] : value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.checkout(this.state);
        //alert('Su orden está siendo procesada, revise su email.' + '\n' + 'Gracias por su compra!');
    }

    render() {
    return (
        <div id="checkout" class="container" className={`${style.container}`}>
                <div class="py-5 text-center">
                    <h1>Check out</h1>
                </div>
                <div class="row">
                    <div class="col-md-12 order-md-1">
                        <form className={`${style.form}`} onSubmit={this.handleSubmit.bind(this)} class="needs-validation" novalidate>

                            <hr class="mb-4" />
                                <h4 class="mb-3">Correo electrónico: </h4>
                                <div class="row" className={`${style.emailShipment}`}>
                                    <div class="col-md-6 mb-3">
                                    <input onChange={this.setInput} type="email" class="form-control" id="emailShipment" placeholder="Correo electrónico..." value={this.state.emailShipment} required/>
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div> 
                                    </div>
                                </div>

                            <hr class="mb-4" />
                                <h4 class="mb-3">Dirección de envío: </h4>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="street">Calle: </label>
                                        <input onChange={this.setInput} type="text" class="form-control" id="street" placeholder="Calle..." value={this.state.street} required />
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div>
                                    </div>

                                    <div class="col-md-2 mb-3">
                                        <label for="number">Número: </label>
                                        <input onChange={this.setInput} type="number" class="form-control" id="number" placeholder="Número..." value={this.state.number} required />
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div>
                                    </div>

                                    <div class="col-md-4 mb-3">
                                        <label for="apartment">Departamento: <span class="text-muted">(Opcional)</span></label>
                                        <input onChange={this.setInput} type="number" class="form-control" id="apartment" placeholder="Departamento..." value={this.state.apartment}/>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="city">Ciudad: </label>
                                        <input onChange={this.setInput} type="text" class="form-control" id="city" value={this.state.city} placeholder="Ciudad..." required />
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div>
                                    </div>

                                    <div class="col-md-3 mb-3">
                                        <label for="cp">Código Postal: </label>
                                        <input onChange={this.setInput} type="number" class="form-control" id="cp" placeholder="Código Postal..." value={this.state.cp} required />
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <label for="province">Provincia: </label>
                                        <input onChange={this.setInput} type="text" class="form-control" id="province" value={this.state.province} placeholder="Provincia..." required />
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <label for="country">País: </label>
                                        <input onChange={this.setInput} type="text" class="form-control" id="country" value={this.state.country} placeholder="País..." required />
                                        <div class="invalid-feedback">
                                            Campo obligatorio.
                                        </div>
                                    </div>
                                </div>

                            <hr class="mb-4" />
                                <h4 class="mb-3">Forma de pago: </h4>
                                    <div className={`${style.pago}`}>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" id="efectivo" name="groupOfDefaultRadios" defaultChecked/>
                                            <label class="custom-control-label" for="efectivo"> Efectivo </label>
                                        </div>

                                        <div class="custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" id="debito" name="groupOfDefaultRadios"/>
                                            <label class="custom-control-label" for="debito"> Tarjeta de Débito </label>
                                        </div>

                                        <div class="custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" id="credito" name="groupOfDefaultRadios"/>
                                            <label class="custom-control-label" for="credito"> Tarjeta de Crédito </label>
                                        </div>
                                    </div>

                            <hr class="mb-4" />
                                <button type="submit" class="btn btn-success btn-lg btn-rounded" onClick={this.handleCheckout}>Comprar!</button>
                            <hr class="mb-4" />
                        </form>
                    </div>
                </div>
        </div>
    )
}
}

function mapStateToProps(state) {
    return {
        shopCart:state.shopCart,
        user: state.user,
        order: state.order
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dbSync: details => dispatch(dbSync(details)),
        checkout : (order) => dispatch(checkOut(order)),
        completeshopCart:()=> dispatch(completeshopCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);