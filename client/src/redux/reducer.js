
import {
    LOGIN_USER_COOKIE,
    GET_USERS,
    COMPLETE_SHOPCART,
    GET_ARTICLES,
    DB_SYNC,
    DELETE_SHOPCART,
    PUT_SHOPCART,
    ADD_PRODUCT_TO_SHOPCART,
    CLEAR_SHOPCART,
    GET_PRODUCTS, 
    GET_PRODUCT, 
    GET_CATEGORIES, 
    GET_CATEGORY, 
    SEARCH_PRODUCT, 
    ADD_USER, 
    ADD_PRODUCT, 
    ADD_CATEGORY,
    ADD_CATEGORY_TO_PRODUCT,
    MODIFY_PRODUCT,
    MODIFY_CATEGORY,
    REMOVE_PRODUCT,
    REMOVE_CATEGORY,
    DELETE_RELATION,
    LOGIN,
    LOGOUT,
    GET_ORDERS,
    GET_ORDER,
    PUT_ORDER,
    GET_REVIEWS,
    ADD_REVIEW,
    GET_ORDERS_FROM_USER,
    GET_LOCALSTORAGE,
    GET_ORDER_USER_DETAIL
                } from "./actions";




// Sirven para hardcodear el carrito y hacer pruebas 
const initarticles=[
    {price:490,name:"Campera desmontable negra ",description:"Chaleco Inflable Con Capucha Desmontable",img:'https://i.ibb.co/vL1HSmD/CAMPERA-PARA-PERRO-PNG.png',quantity:"4",stock:4,orderId:null,productId:2},
    {price:360 ,quantity:"3",name:"Pretal Gatito",img:'https://i.ibb.co/SnBKnT4/ARNES-PARA-GATO-PNG.png',description:"Pretal/Arnes Para Gatos Con Correa Microcentro",orderId:null,stock:10,productId:12},
    {price:550,quantity:"2",name:"Sweater de lana",img:'https://i.ibb.co/bR2YRzH/BUZO-PARA-GATO-PNG.png',description:"Abrigo para gatos tipo sweater ",orderId:null,stock:2,roductId:7}]



    
    const initialState = {
        userOrderDetail:{},
        ordersFromUser: [],
        orders: [],
        order:{},
        products:[],
        users: [],
        catalogue: [],
        categories: [],
        AllLoaded:false,
        productDetail: {},
        categoryDetail: {},
        order: {
            state: 'cart'
        },
        shopCart:{
            articles:[],      
            state:'cart',
            id:null             
        },
        user:{
            id:null,
            isLogged:false,
            email:null,
            name:null,
            surname:null,
            admin:null,
            banned:null
        },
        reviews: []
}; 

function reducer(state = initialState, action) {

    switch(action.type) {
       
        case SEARCH_PRODUCT:
            return {
                ...state,
                catalogue: action.payload,
                
            } 
        case GET_PRODUCT:
            return {
                ...state,
                productDetail:action.payload,
            }
        case GET_PRODUCTS:
            return {
                ...state,
                catalogue: action.payload,
                products:action.payload,
                AllLoaded:true
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories:action.payload
            }


        case GET_CATEGORY:
            return {
                ...state,
                catalogue: action.payload,  
                products: !state.AllLoaded ? action.payload : state.products // Esto servirá para el futuro
            }
            
        case GET_ORDERS:
            return {
                ...state,
                orders:action.payload
            }

        case GET_USERS:
            return {
                ...state,
                users:action.payload
            }
    

        case GET_ORDER:
            return {

                ...state,
                order:action.payload
            }

        case GET_ORDER_USER_DETAIL:
            return {
                ...state,
                userOrderDetail:action.payload
            }


        case ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }

        case  ADD_PRODUCT_TO_SHOPCART:
            return {
                ...state,
                shopCart: {
                    ...state.shopCart,
                    articles: state.shopCart.articles.concat(action.payload),
                    state:'created'
                }
                
            }
        case  CLEAR_SHOPCART: 
            return {
                ...state,
                shopCart: {
                        articles: [],
                        state:'cart'
                    }
                    
                }
        
        // case CHECKOUT:
        //     return {
        //         ...state,
        //         order: {
        //             state: 'processing'
        //         },
        //         shopCart:{
        //             ...state,
        //             id: action.payload,
        //             articles: action.payload,      
        //             state: 'processing'           
        //         }
        //     }

        case  DELETE_SHOPCART: 
        return {
            ...state,
            shopCart: {
                    ...state.shopCart,
                    articles: state.shopCart.articles.filter(p=>p.productId !== action.payload),     
                }
                
            }

        case PUT_SHOPCART: 
            const i = state.shopCart.articles.indexOf(state.shopCart.articles.filter(p => p.productId == action.payload.productId)[0]);
            var {description,img,name,orderId,price,productId,quantity,stock} = state.shopCart.articles[i];
                quantity = Number(quantity) + Number(action.payload.value);
                console.log(quantity);
            return {
                ...state,
                shopCart: {
                    ...state.shopCart,
                    articles: [].concat(state.shopCart.articles.slice(0,i),{description,img,name,orderId,price,productId,quantity,stock},state.shopCart.articles.slice(i+1))
                
                }
        }

        case PUT_ORDER:
            return {
                ...state,
                order: action.payload
            }


        case LOGIN: 
            if( action.payload.id===undefined ){
                return {
                    ...state,
                    user: {
                        isLogged:false
                    }
                }
            }
            else {
            return {
                ...state,
                user: {
                    isLogged:true,
                    id:action.payload.id,
                    email:action.payload.email,
                    name:action.payload.name,
                    surname:action.payload.surname,
                    admin:action.payload.admin,
                    banned:action.payload.banned
                }
            }}
        
        case LOGOUT:
            return {
                
                ...state,
                user: {
                    isLogged: false
                }
            }

        case LOGIN_USER_COOKIE:
            console.log('llegó al reducer la cookie',action.payload.id)
            if( action.payload.id===undefined ){
                return {
                    ...state,
                    user: {
                        isLogged:false
                    }
                }
            }
            else {
                return {
                ...state,
                user: {
                    isLogged:true,
                    id:action.payload.id,
                    email:action.payload.email,
                    name:action.payload.name,
                    surname:action.payload.surname,
                    admin:action.payload.admin,
                    banned:action.payload.banned
                }
                }
            }

        case  DB_SYNC: 
        
            return {
                ...state,
                shopCart: {
                    ...state.shopCart,
                    id:action.payload.id,
                    state: action.payload.status,
                }
            }

        case  GET_LOCALSTORAGE: 
            return {
                ...state,
                shopCart: {
                    ...state.shopCart,
                    articles:action.payload.articles,
                    id:action.payload.id,
                    state: action.payload.status,
                }
            }

        case  GET_ARTICLES: 
            return {
                ...state,
                shopCart: {
                    ...state.shopCart,
                    articles:action.payload
                }
            }

        case  COMPLETE_SHOPCART: 
            return {
                ...state,
                shopCart: {
                    ...state.shopCart,
                    articles:[],      
                    state:'cart',
                    id:null
                }
            }

        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }

            case GET_ORDERS_FROM_USER:
                return {
                    ...state,
                    ordersFromUser: action.payload
                }

        default:
            return state;

    }

  }
  
  export default reducer;