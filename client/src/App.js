import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Catalogue from "./components/Catalogue.jsx";
import SearchBar from './components/SearchBar';
import Carousel from "./components/Carousel";
import FormCategory from './components/FormCategory';
import FormDelete from "./components/FormDelete";
import FormUpdate from "./components/FormUpdate";
import FormAdd from "./components/FormAdd";
import FormUser from "./components/FormUser";
import ModificarProducto from "./components/ModificarProducto";
import ModificarOrden from "./components/ModificarOrden";
import ModificarUsuario from "./components/ModificarUsuario";
import store from './redux/store';
import Orders_Table from "./components/Orders_Table";
import { getProducts, getCategories, getOrders, loginUserCookie,getlocalStorage,dbSync} from './redux/actions';
import Carrito from './components/Carrito'
import Checkout from './components/Checkout';
import Container from './components/Container';
import UserLogin from "./components/UserLogin";
import UsersTable from "./components/ViewAllUsers";
import Profile from './components/Profile';
import changePassword from './components/ChangePassword';
import OrdersUser from './components/ordersFromUser';
import UserOrderDetails from './components/UserOrderDetails';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }
    componentDidMount() {
        store.dispatch(loginUserCookie())
        .then((json)=>{
            store.dispatch(dbSync(json.id));
            if(!this.state.user.isLogged && localStorage.getItem('shopCart'))  
                store.dispatch(getlocalStorage(JSON.parse(localStorage.getItem("shopCart"))))
        })
        store.dispatch(getProducts());
        store.dispatch(getCategories());
        store.dispatch(getOrders());
        store.subscribe(() => {
            this.setState(store.getState());
    });
    }
    render(){
        return (
        <div className="App ">
            <Route 
                path= "/"
                render={() => <SearchBar onSearch/>}
            />
            <Route
                exact path="/"
                component= {Carousel}
            />
            <Route
                exact path='/products'
                render={() => <Catalogue  category={'todos'}/>}
            />
            <Route
                exact path='/user/perfil/orders'
                render={() => <ordersUser orders = {this.state.orders}/>}
            />
            <Route
                exact path='/products/:id'
                render={({match}) => 
                <Container selected={match.params.id} />
                }/>
            <Route
                exact path='/products/category/:name'
                render={({match}) => <Catalogue  category={match.params.name}/>}
            />
            <Route
                exact path='/user/form/agregar'
                render={()=><FormUser user={this.state.user}/>}
            />
            <Route
                exact path='/user/perfil'
                render={()=><Profile user={this.state.user}/>}
            />
            <Route
                exact path='/admin/orders'
                render={()=><Orders_Table orders={this.state.orders}/>}
            />
            <Route
                exact path='/admin/orders/:id'
                render={({match}) => <ModificarOrden  id={match.params.id}/>}
            />
            <Route
                exact path='/admin/form/agregar'
                render={()=><FormAdd categories={this.state.categories}/>}
            />
            <Route
                exact path='/admin/form/borrar'
                render={()=><FormDelete array={this.state.products}/>}
            />
            <Route
                exact path='/admin/form/modificar'
                render={()=><FormUpdate array={this.state.products}/>}
            />
            <Route
                exact path='/admin/form/modificar/:id'
                render={({match})=><ModificarProducto categories={this.state.categories} selected={this.state.products.filter(producto => producto.id===parseInt(match.params.id))[0]}/>}
            />
            <Route
                exact path='/admin/form/categoria'
                component={FormCategory}
            />
            <Route
                exact path='/admin/form/users'
                render={()=><UsersTable users={this.state.users}/>}
            />
            <Route
                exact path='/admin/form/users/:id'
                render={({match})=><ModificarUsuario id={match.params.id}/>}
            />
            <Route
                exact path='/user/shopCart'
                component={Carrito}
            />
            <Route
                exact path='/auth/checkout'
                component={Checkout}
            />
            <Route
                exact path='/auth/login'
                render={()=><UserLogin user={this.state.user}/>}
            />
            <Route
                exact path='/user/perfil/orders'
                component={OrdersUser}
            />
            <Route
                exact path='/user/perfil/orders/:id'
                render={({match})=><UserOrderDetails id={match.params.id}/>}
            />
            <Route
                exact path='/user/perfil/passwordReset'
                component={changePassword}
            />
        </div>
        );
    }
}
