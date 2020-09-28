export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORY = "GET_CATEGORY";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_CATEGORY_TO_PRODUCT = "ADD_CATEGORY_TO_PRODUCT";
export const MODIFY_PRODUCT = "MODIFY_PRODUCT";
export const MODIFY_CATEGORY = "MODIFY_CATEGORY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const DELETE_RELATION = "DELETE_RELATION";
export const ADD_USER = "ADD_USER";
export const ADD_PRODUCT_TO_SHOPCART = 'ADD_PRODUCT_TO_SHOPCART';
export const CLEAR_SHOPCART = 'CLEAR_SHOPCART';
export const PUT_SHOPCART = 'PUT_SHOPCART';
export const DELETE_SHOPCART = 'DELETE_SHOPCART';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDER = "GET_ORDER";
export const PUT_ORDER = "PUT_ORDER";
export const DB_SYNC = "DB_SYNC";
export const GET_ARTICLES = "GET_ARTICLES";
export const COMPLETE_SHOPCART = 'COMPLETE_SHOPCART';
export const GET_ORDERS_FROM_USER = "GET_ORDERS_FROM_USER";
export const ADD_REVIEW = 'ADD_REVIEW';
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_USERS = 'GET_USERS';
export const CHECKOUT = "CHECKOUT";
export const LOGIN_USER_COOKIE = 'LOGIN_USER_COOKIE';
export const GET_LOCALSTORAGE = "GET_LOCALSTORAGE";
export const GET_ORDER_USER_DETAIL = "GET_ORDER_USER_DETAIL";


// Obtiene todos los productos de la DB - Si el usuario lo hace, nutre el store y agiliza la aplicación para el resto de la sesión :D

export function getProducts() {
    return function(dispatch) {
      return fetch("http://localhost:3001/products", {credentials: "include"})
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_PRODUCTS", payload: json });
          console.log('Products ready!');
        });
    };
}



// Obtiene un producto determinado a partir de su ID 
// De la manera que está diseñada la App, un usuario no debería "saber" el ID de un producto
// Por ende no debería llegar a la ruta del client /product/:id sin antes haber buscado el producto en el catálogo
// Redux está diseñado para no tener que ir a buscar un producto a la BD cada vez que el usuario quiera ver uno en particular(detalle - ProductCard
// En caso de que un malintencionado usuario rompedor de páginas intente acceder a un producto por su ID, sin haberlo "cargado" en redux
//  Tendremos esta accion preparada para sus malos intereses 

export function getProduct(id) {
    return function(dispatch) {
      return fetch("http://localhost:3001/products/" + id, {credentials: "include"})
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_PRODUCT, payload: json });
        });
    };
}



// Obtiene todas las categorías 

  export function getCategories() {
      return function(dispatch) {
        return fetch("http://localhost:3001/products/categories", {credentials: "include"})
          .then(response => response.json())
          .then(json => {
            dispatch({ type: "GET_CATEGORIES", payload: json });
          });
      };
  }


// Obtiene todos los productos según la categoría seleccionada

  export function getCategory(name) {
      return function(dispatch) {
        return fetch("http://localhost:3001/products/category/" + name, {credentials: "include"})
          .then(response => {
            return response.json()
          })
          .then(json => {

            dispatch({ type: "GET_CATEGORY", payload: json[0].products });
          });
      };
}

//Obtiene todas las ordenes de un usuario

export function getOrdersFromUser(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/user/${id}/orders`, {credentials: "include"}) 
    .then(response => response.json())
    .then(json => {
      dispatch({ type: "GET_ORDERS_FROM_USER", payload: json});
    });
  };
}

//Obtiene una orden del usuario x id (de orden) con sus detalles 
export function getDetailsOfOrder(id) {
  return function(dispatch) {
    return fetch("http://localhost:3001/orders/" + id, {credentials: "include"})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_ORDER_USER_DETAIL", payload: json });
      });
  };
}


//obtiene todas las ordenes

export function getOrders() {
  return function(dispatch) {
    return fetch("http://localhost:3001/orders", {credentials: "include"})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_ORDERS", payload: json });
      });
  };
}

//obtiene todos los usuarios

export function getUsers() {
  return function(dispatch) {
    return fetch("http://localhost:3001/user", {credentials: "include"})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_USERS", payload: json });
      });
  };
}

//Obtiene una orden x id con sus detalles 
export function getOrder(id) {
  return function(dispatch) {
    return fetch("http://localhost:3001/orders/" + id, {credentials: "include"})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_ORDER", payload: json });
      });
  };
}


//Busca un producto segun nombre o descripcion(case insensitive)

export function searchProduct(name) {
    return function(dispatch) {
      return fetch("http://localhost:3001/products/search?value=" + name, {credentials: "include"})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "SEARCH_PRODUCT", payload: json });
      });  
    };
}



// Estas acciones no son necesarias ya que 
// Las mismas impactan en la base de datos y los clientes(usuarios) obtienen información directamente de alli
// Por ende no se necesitará la mediación de redux(que se encarga básicamente de los GET)


// Igual  Buen trabajo Juli !!!!!!!!! Las dejo unos días más por si se nos ocurre hacer algo con ellas :D

export function addProduct(payload) {           //POST ...> /products
  return { type: "ADD_PRODUCT", payload };
}

export function addCategory(payload) {          // POST -->  /products/category
  return { type: "ADD_CATEGORY", payload };
}

export function addUser(payload) {          // POST -->  /products/category
return { type: "ADD_USER", payload };
}

export function addReview(payload) {          // POST -->  /reviews
  return { type: "ADD_REVIEW", payload };
}

export function addCategoryToProduct(payload) {    // POST--> :idProducto/category/:idCategoria
  return { type: "ADD_CATEGORY_TO_PRODUCT", payload };
}

export function modifyProduct(payload) {    //PUT products/:id
  return { type: "MODIFY_PRODUCT", payload };
}

export function modifyCategory(payload) {             // PUT -->  /products/category/:id
  return { type: "MODIFY_CATEGORY", payload };
}

export function updateOrder(payload) {
  return { type: "PUT_ORDER", payload};
}

export function removeProduct(payload) {          // DELETE ---> /products/:id
  return { type: "REMOVE_PRODUCT", payload};
}

export function removeCategory(payload) {          // DELETE  -->  /products/category/:id
  return { type: "REMOVE_CATEGORY", payload};
}

export function deleteRelation(payload) {          //DELETE  -->  :idProducto/category/:idCategoria 
  return { type: "DELETE_RELATION", payload}; }




/*		 ____________________________________________________________________________
			||																		                                      ||
			||					        >>>>>>>>>> USER ACTION <<<<<<<<<<				                ||
			||				------->>>          Login             <<<-------		              ||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/


// Estas actions se despachaán cada vez que se LOGUEE un usuario o bien se registre->Login AUTOMATICO


// export function login(email) {        // Loguea un usuario recibe su datos(id, name, username, email)
//   return function(dispatch) {
//     return fetch("http://localhost:3001/user/email/"+email)
//     .then(response => response.json())
//       .then(json => {
//         dispatch({ type: "LOGIN", payload: json });
//         return json;
//       }).catch((err) => alert("La cuenta que has ingresado no existe",err))
//   };
// }
export function loginUserCookie() {      // Trae el usuario con las cookies cuando se refresca la pagina
  return function(dispatch) {
    return fetch(`http://localhost:3001/login`, {credentials: "include"})
    .then(response => response.json())
      .then(json => {
        dispatch({ type: LOGIN_USER_COOKIE, payload: json });
        return json;
      }).catch(() => console.log("Hubo un error al obtener el user con cookies"))
  };
}


export function login(payload) {    // Loguea un usuario recibe su datos(id, name, username, email)
  return { type: "LOGIN", payload };
}

export function logout() {     // Loguea un usuario recibe su datos(id, name, username, email)
  localStorage.clear()
  return { type: LOGOUT};
}

export function getArticles(id) {   
  let art= (JSON.parse(localStorage.getItem("shopCart")) && JSON.parse(localStorage.getItem("shopCart")).articles) || [];
  return function(dispatch) {
    return fetch(`http://localhost:3001/orders/${id}`, {credentials: "include"})
    .then(response => response.json())
      .then(json => {
        console.log("Esto es el length de Order_details actual en le BD",json.order_details.length)
        if(json.order_details.length){
           if(!art.length){
               dispatch({ type: GET_ARTICLES, payload: json.order_details });
               console.log('La transición fue limpia',art)
               return 'CLEAN'+id;   // Caso que el usuario guest no haya echo nada aún con su carrito, tomará los items que tenga en su cuenta
           }
            else if ( window.confirm("Encontramos un Carrito existente, si confirma esta acción perderá los actuales como invitado")){
                 dispatch({ type: GET_ARTICLES, payload: json.order_details });
                return 'DB_SHOPCART'+id;  // Caso que el guest prefiera recuperar su carrito anterior almacenado en la BD
            }
             else{
                alert(" ¡¡ Perfecto !!, Puedes continuar con tu compra actual")
              dispatch({ type: GET_ARTICLES, payload: art });
              return 'ACTUAL_SHOPCART'+id;  // REQUIERE ELIMINAR ANTERIOR --> Caso que el guest prefiera descartar el carrito previo y sincronizar el actual en su BD
          }
        }
        else{
            alert(" ¡¡ Hola !! Te damos la bienvenida ")
              dispatch({ type: GET_ARTICLES, payload: art });
              console.log('Transladando articulos a la DB del user sin problemas')
              return 'TRANSLATE'+id; // Caso que el guest se loguee con un carrito vacío --> seguir editando mi carrito
        }
      }).catch(() => console.log("Hubo un error al obtener los detalles del carrito"))
  };
}

export function getReviews(id) {        
  return function(dispatch) {
    return fetch(`http://localhost:3001/products/${id}/review`, {credentials: "include"})
    .then(response => response.json())
      .then(json => {
        console.log(json)
        dispatch({ type: GET_REVIEWS, payload: json });
      }).catch(() => console.log("Hubo un error"))
  };
}

    export function dbSync(id) {        
  return function(dispatch) {
          var url = "http://localhost:3001/orders";
          var data =  {
          userId: id,
    };
        return  fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
              'Content-Type': 'application/json'
          },
          credentials: "include"
          })
          .then(response => response.json())
          .then(json => {
          console.log('Se encontró/creo este carrito',json)
          dispatch({ type: DB_SYNC, payload: json });
            return json.id })
            .catch(() => console.log("Hubo un error"))
  };
    }








/*		 ____________________________________________________________________________
			||																		                                      ||
			||					        >>>>>>>>>> ShopCart ACTIONS <<<<<<<<<<				          ||
			||				       ------->>>                       <<<-------		            ||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/





        // antes de despachar hemos de comprobar el login con props.user.isLogged--> payload={price:prod.price,quantity:prod.inputquantity, orderId:props.user.id, prodId: prod.id}
export function addshopCart(payload) {        // Agrega una orden_detail 
  return { type: ADD_PRODUCT_TO_SHOPCART, payload };
}

export function clearshopCart(payload) {        // Limpia el Carrito 
  return { type: CLEAR_SHOPCART, payload };
}

export function completeshopCart() {            // Limpia el Carrito 
  return { type: COMPLETE_SHOPCART };
}

export function putshopCart(payload) {          // Modifica Orden detail
  return { type: PUT_SHOPCART, payload };
}

export function deleteshopCart(payload) {        // Elimina Orden detail
  return { type: DELETE_SHOPCART, payload };
}

export function getlocalStorage(payload) {       // Guest sincronizando
  return { type: GET_LOCALSTORAGE, payload };
}
// export function checkOut(id) { 
//   return function(dispatch){
//     return fetch(`http://localhost:3001/orders/${id}`, {credentials: "include"}) // Hace checkout de una orden
//     .then(response => response.json())
//       .then(json => {
//         console.log("Orden en el carrito.")
//         dispatch({ type: CHECKOUT, payload: json });
//       }).catch(() => alert("Hubo un error al obtener los detalles del carrito"))
//   };  
// }
