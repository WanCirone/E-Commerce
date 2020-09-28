const server = require('express').Router();
const { User, Order, Order_detail, Product} = require('../db.js');
const { Op } = require("sequelize");
var cors = require('cors');
// const { default: Product } = require('../../../client/src/components/Product.js');

/*			 ____________________________________________________________________________
			||																			||
			||						>>>>>>>>>> ORDENES <<<<<<<<<<						||
			||				------->>>    Rutas POST, PUT, GET     <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

                          // DIRECCION==== >"localhost:3001/orders"


//POST--> Crear una nueva orden 
//(crea orden siempre en estado "carrito", solo necesita userId)

server.post('/', (req, res, next) => {
    (console.log(req.body))
    if(!req.body.userId){ 
        res.status(400)
        .send('Cuidado! Faltan datos para poder crear una orden')
    }
    else{
    Order.findOne({         // Buscar un carrito activo Status:"created"
        where: {
          userId: req.body.userId,
          status:"created"
        }
    }).then(res=>
        !res ?  Order.findOne({  // Si no lo encuentra, buscará un Status:"cart"
            where: {
              userId: req.body.userId,
              status:"cart"
            }
        }) : res
    )
        .then((order) =>{                   // Si no encontró carrito activo, creará uno en estado "cart"
            if(!order){
                Order.create({
                      userId: req.body.userId,
                      status:"cart"
                    }).then(created=>res.status(200).send(created))
            }
           else
            return res.status(201).send(order)
        }
        ).catch(next);
    }

    });

//GET--> Obtiene todas las ordenes existentes

server.get('/', (req, res, next) => { 

    Order.findAll()
        .then(order => {
            res.send(order);
        })
        .catch(error => {
            console.log(error)
            res.sendStatus(400)
        })
});

//GET--> Obtiene una orden en particular con todos sus detalles: (x id de orden)
// -Todos los productos de esa orden con su nombre de producto
//- Los datos del usuario 

server.get('/:id', (req, res, next) => { 

    Order.findByPk(
        req.params.id, 
        {include: [
            {model:User},
            {model: Order_detail, include: [{model: Product, attributes: ["name"]}]}
        ]
        }
    )
        .then(order => {
            res.send(order);
        })
        .catch(error => {
            console.log(error)
            res.sendStatus(400)
        })
});

// PUT --> Modificar (el estado de) una orden existente

server.put('/:id', (req, res, next) => {

    if(!req.body.status){ //si no tiene estado
        res.status(400)
        .send('No estas modificando ningun campo')
    }
    else
    Order.findByPk(req.params.id).then((order)=>{
        order.status= req.body.status; 
        return order.save();
    })
    .then((order)=> res.status(200).send(order))
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
});


/*			 ____________________________________________________________________________
			||																			||
			||        Ojo! La ruta que retorna todas las ordenes de 1 usuario           ||
			||	                       está en routes-->user.js (al final)              ||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/





module.exports = server;