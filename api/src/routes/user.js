const server = require('express').Router();
const { User, Order, Order_detail } = require('../db.js');
const { Op } = require("sequelize");
var cors = require('cors');
const crypto = require('crypto');


/*			 ____________________________________________________________________________
			||																			||
			||						>>>>>>>>>> USUARIOS <<<<<<<<<<						||
			||				------->>> Rutas POST, PUT, GET, DELETE <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

                          // DIRECCION==== >"localhost:3001/user"


    User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
    };
    User.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
    };
    
    const setSaltAndPassword = user => {
    if (user.changed('password')) {
        console.log(user)
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
    };
    User.beforeCreate(setSaltAndPassword)
    User.beforeUpdate(setSaltAndPassword)
    
    User.prototype.correctPassword = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
    };
    


//POST--> Crear un nuevo usuario 

server.post('/', (req, res, next) => {

    if(!req.body.email || !req.body.name || !req.body.surname || !req.body.password){ 
        res.status(400)
        .send('Cuidado! Faltan datos para poder crear un usuario')
    } else {
        User.create({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            password: req.body.password,
            banned:req.body.banned || false,
            admin:req.body.admin || false
            }).then(function (user) {
                // bcrypt.genSalt(10, (err, salt) => {
                //     if (err) return next(err);
                //     bcrypt.hash(req.body.password, salt, (err, hash) => {
                //         console.log('hashealo');
                //         if (err) return next(err);
                //         User.password = hash;
                //     });
                // });
                res.status(201)
                res.send(user)
            }).catch(next);        
    }

});


// PUT --> Modificar un usuario existente

server.put('/:id', (req, res, next) => {

    if(!req.body.email && !req.body.name && !req.body.surname && !req.body.password && !req.body.admin && !req.body.banned ){ //si no tiene ningun campo
        res.status(400)
        .send('No estas modificando ningun campo')
    }
    else
    User.findByPk(req.params.id).then((user)=>{
        console.log(user)
        if(req.body.email){
            user.email= req.body.email;
            user.save();
        }
        if(req.body.name){ 
            user.name= req.body.name;
            user.save();
        }
        if(req.body.surname){ 
            user.surname= req.body.surname;
            user.save();
        }
        if(req.body.password){ 
            user.password= req.body.password;
            user.save();
        }
        if(req.body.admin){ 
            user.admin= req.body.admin;
            user.save();
        }
        if(req.body.banned){ 
            user.banned= req.body.banned;
            user.save();
        }
        console.log(user)
        return user
    }).then((user)=> res.status(200).send(user)).catch(next);

})

// GET --> Obtener todos los usuarios existentes 

server.get('/', (req, res, next) => { 

    User.findAll({
        order: [
            ["id"]
        ]
    })
        .then(user => {
            res.send(user);
        }) 
        .catch(error => {
            console.log(error)
            res.sendStatus(400)
        })
});

// DELETE --> Borrar un usuario

server.delete('/:id', (req, res, next) => {

    User.findByPk(req.params.id)
    .then((user)=>user.destroy())
    .then((user)=> res.status(200).send("Usuario eliminado exitosamente"))
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })

});


/*			 ____________________________________________________________________________
			||																			||
			||       >>>>>>>>>> CARRITO (DETALLE DE PEDIDO) <<<<<<<<<<		        	||
			||				------->>> Rutas POST, PUT, GET, DELETE <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

                          // DIRECCION==== >"localhost:3001/user"


//POST--> Agregar producto a carrito

server.post('/:idUser/cart', (req, res, next) => {

    if(!req.body.price || !req.body.quantity){ 
        res.status(400)
            .send('No se puede agregar al carrito sin saber precio y cantidad')
    }
    else
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: req.params.idUser }, 
                { status: {
                    [Op.or]: ['cart', 'created']
                }} 
            ]
        }
    })   
    .then((orden)=> {

        // Si ya existe para ese producto una orden_detail, segrega la cantidad en vez de crear una nueva
        if (orden.status === "cart"){
            orden.status = "created"
            orden.save();
     }

        Order_detail.findOne({
            where: {
                [Op.and]: [
                    { productId: req.body.productId}, 
                    { orderId:orden.id  }
                ]
            }
        }).then(existente=>{
            if(existente){
                existente.quantity+=req.body.quantity
               return existente.save();
            }
            else{

                const detalle = Order_detail.create({
                    price: req.body.price,
                    quantity: req.body.quantity,
                    productId: req.body.productId,  
                    orderId: orden.id 
                })

                 return detalle
            }

            })

            .then(function (detalle) {
                res.status(201)
                res.send(detalle)
            }).catch(error => {
                console.log(error)
                res.sendStatus(400)
            })

            })
  });

//GET --> Obtiene todos los productos del carrito     

server.get('/:idUser/cart', (req, res, next) => {
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: req.params.idUser }, 
                { status: {
                    [Op.or]: ['cart', 'created']
                }} 
            ]
        },
        include: Order_detail
    })   
    .then(function(detail) {
        res.send(detail.order_details)
    }).catch(error => {
        res.sendStatus(400)
    })
}) 

//DELETE --> vaciar el carrito 

server.delete('/:idUser/cart', (req, res, next) => {
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: req.params.idUser }, 
                { status: {
                    [Op.or]: ['cart', 'created']
                }} 
            ]
        },
        include: Order_detail
    })   
    .then((detail) => {
        const productos= detail.order_details
        productos.map(producto=>producto.destroy())
    })        
    .then(() => res.status(200).send("Su carrito fue vaciado exitosamente"))
    .catch(error => {
        res.sendStatus(400)
    })
})


//DELETE --> borrar un producto del carrito   

server.delete('/:idUser/cart/borrar', (req, res, next) => {
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: req.params.idUser }, 
                { status: {
                    [Op.or]: ['cart', 'created']
                }} 
            ]
        }, 
        include: {
            model: Order_detail,
            where: {
                productId: req.body.productId
            }
        }
    })   
    .then((detail) => {
        detail.order_details[0].destroy()
    })        
    .then(() => res.status(200).send(req.params.idUser))
    .catch(error => {
        res.sendStatus(400)
    })
})

//PUT--> Editar las cantidades del carrito

server.put('/:idUser/cart', (req, res, next) => {

    if(!req.body.productId || !req.body.quantity){ 
        res.status(400)
        .send('No se puede modificar las cantidades sin saber producto y cantidad')
    }
    else 
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: req.params.idUser }, 
                { status: {
                    [Op.or]: ['cart', 'created']
                }} 
            ]
        }, 
        include: {
            model: Order_detail,
            where: {
                productId: req.body.productId
            }
        }
    })   
    .then((detalle)=> {
        console.log(detalle)
        const producto= detalle.order_details
        producto[0].quantity=req.body.quantity
        return producto[0].save()
    })
    .then(function (producto) {
        console.log (producto)
        res.status(201)
        res.send(producto)
    })
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
})



/*			 ____________________________________________________________________________
			||																			||
			||                     >>>>>>>>>>  ORDEN   <<<<<<<<<<		                ||
			||	------->>> Retorna todas las ordenes de 1 usuario <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

                          // DIRECCION==== >"localhost:3001/user"

//GET--> Obtiene todas las ordenes de un usuario 

server.get('/:id/orders', (req, res, next) => { 

    Order.findAll({
        where: {userId: req.params.id}
    })
        .then(order => {
            res.send(order);
        })
        .catch(error => {
            console.log(error)
            res.sendStatus(400)
        })
});



/*			 ____________________________________________________________________________
			||																			||
			||                     >>>>>>>>>>  ACCESORIOS   <<<<<<<<<<      		    ||
			||	------->>> Retorna todas las ordenes de 1 usuario <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

// Obtiene la información de un usuario y sus carritos activos desde su email  (Login)

// server.get('/email/:email', (req, res, next) => {
// console.log('Se ha indentado logear con:',req.params.email);

// User.findOne({
//     where: {
//         email:req.params.email,
//     },
//     include: Order,
// })
// .then(user=>{
//    return res.status(200).send(user)
// })
// .catch(error => {
//     console.log(error)
//     res.sendStatus(400)
// })

// });




module.exports = server;



