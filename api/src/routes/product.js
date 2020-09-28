const server = require('express').Router();
const { Product, Category, prod_cat, Reviews, User } = require('../db.js');
const { Op } = require("sequelize");



/*			 ____________________________________________________________________________
			||																			||
			||						>>>>>>>>>> PRODUCTOS <<<<<<<<<<						||
			||				------->>> Rutas GET, POST, PUT y DELETE <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

function isBanned(req, res, next) {
	if(req.user.dataValues.banned === false) {
		next();
	} else {
		res.send('Su usuario esta banneado')
	}
}

function isAdmin(req, res, next) {
	console.log(req.user)
	if (req.user && req.user.admin === true) {
		console.log(true)
				next();
	} else {
		console.log('Permiso denegado')
		res.send('Permiso denegado');
	}
}

// S15 --> GET: Ruta para obtener todos los detalles de un producto
	server.get('/:id', (req, res, next) => {
	
			console.log(req.params.id,'--> Entro en id con este Valor')


		if(req.params.id == Number(req.params.id)){
			console.log('Matcheo el string con el number')
			Product.findByPk(req.params.id,{include : Category})
			.then(function(product) {
				res.send(product)

			}).catch(next);
		}
		else{
			console.log('---> Luego entro en el next()')
			next();
		}
	});


 // S23 --> GET: Ruta que retorna productos segun el keyword de búsqueda: /search?query={valor}

server.get('/search', (req, res, next) => {
	console.log('entro en el search')	

		Product.findAll({
	
				where: {
					[Op.or]: [
						{ name:{[Op.iLike]: `%${req.query.value}%`} },
						{ description:{[Op.iLike]:  `%${req.query.value}%`}}
						]
				}	,
				include: Category
	
		}).then(function(products) {
				res.send(products)
			}).catch(next);
	
		
		
});
	
	// RUTA ACCESORIA Retorna todas las categorías existentes

// server.get('/categories', (req, res, next) => {
// 	console.log('entro en categories')	
		
// 				Category.findAll()
// 					.then(products => {
// 						res.send(products);
// 				}).catch(next);
					
	
		
// });
	



// S21 --> GET: Ruta para obtener todos los productos

	server.get('/', (req, res, next) => {
		console.log(req.cookies)
		Product.findAll()
			.then(products => {
				res.send(products);
			})
			.catch(next);
	});



// S25 --> POST: Ruta para crear/agregar Producto - Validación de datos.

	server.post('/', isAdmin, (req, res, next) => {
		console.log(req.user)
		// Validación temporal -
		if(!req.body.name || !req.body.description || !req.body.price || !req.body.stock||!req.body.img){ 
			res.status(400)
			.send('Cuidado! no se permiten campos indefinidos')
		}

		else
		Product.create({
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				stock: req.body.stock,
				img:req.body.img
			}).then(function (product) {
				res.status(201)
				res.send(product)
			}).catch(next);

	});


// S26 --> PUT: Modifica el producto con un ID 

	server.put('/:id', isAdmin, (req, res, next) => {

		if(!req.body.name && !req.body.description && !req.body.price && !req.body.stock && !req.body.img){  
				res.status(400)
				.send('No estas modificando ningun cambio')
		}
		else
		Product.findByPk(req.params.id).then((prod)=>{

			if (req.body.name){
				prod.name= req.body.name
				prod.save()
			}
			if (req.body.description){
				prod.description= req.body.description
				prod.save()
			}
			if (req.body.price){
				prod.price= req.body.price
				prod.save()
			}
			if(req.body.stock){
				prod.stock= req.body.stock
				prod.save()
			}
			if(req.body.img){
				prod.img=req.body.img;
				prod.save()
			}
			return prod.save();
		})
		.then((prod)=> res.status(200).send(prod))
		.catch(next)
		

	});

	
// S27 --> DELETE: Crea Ruta para eliminar producto

	server.delete('/:id', isAdmin, (req, res, next) => {

		Product.findByPk(req.params.id)
		.then((prod)=>prod.destroy())
		.then((prod)=> res.status(200)
		.send(prod))
		.catch(next);
	
	});



/*			 ____________________________________________________________________________
			||																			||
			||					>>>>>>>>>> CATEGORÍAS <<<<<<<<<<						||
			||				------->>> Rutas POST,GET,PUT y DELETE <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/

		// S18 --> POST:  Ruta para agregar una nueva categoría.

	server.post("/category", isAdmin, (req, res, next) => {
		if(!req.body.name || !req.body.description){				// Validación temporal - 
			res.status(400)											// Hay que validar en el Front !!
			.send('Cuidado! no se permiten campos indefinidos')
		} else {
			Category.create ({
				name: req.body.name,
				description: req.body.description
			}).then(function (category) {
        		res.status(201)
        		res.send(category)
        	}).catch(next);
		}
	});
		// S19 --> DELETE: Ruta para eliminar una categoría.

	server.delete('/category/:id', isAdmin, (req, res, next) => {
		Category.findByPk(req.params.id).then((cat)=>{
			cat.destroy();
		}).then((cat)=> res.status(200).send(cat)).catch(next);
	
		});

		// S20 --> PUT: Ruta para modificar una categoría.

	server.put('/category/:id', isAdmin, (req, res, next) => {

		Category.findByPk(req.params.id).then((category)=>{
			
			if(!req.body.name || !req.body.description){                // Validación temporal - 
					res.status(400)										// Hay que validar en el Front !!
					.send('Cuidado! no se permiten campos indefinidos')
			}

		category.name= req.body.name;
		category.description= req.body.description;
		category.save();
		}).then((cat)=> res.status(200).send(cat)).catch(next);
	
		});

		
		// S22 --> GET: Ruta que devuelve los producto de X categoría

		server.get('/category/:name', (req, res, next) => {
			Category.findAll({
				where: { name: req.params.name } , include: Product 
				})
				.then(ress=>res.send(ress)).catch(next);
		})


		// RUTA ACCESORIA Retorna todas las categorías existentes

	server.get('/categories', (req, res, next) => {
		console.log('entro en categories')	
			
					Category.findAll()
						.then(products => {
							res.send(products);
					}).catch(next);
			
	});
		
	





/*		 ____________________________________________________________________________
		||																			||
		||				    >>>>>>>>>> JUNCTION Prod_Cat <<<<<<<<<<					||
		||				------->>> Rutas POST,GET,PUT y DELETE <<<-------			||
		||__________________________________________________________________________||
		|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/



// S17 --> POST: Para agregar categorías a un producto

	server.post('/:idProducto/category/:idCategoria', isAdmin, (req, res, next) => {
		prod_cat.create({
			productId: req.params.idProducto,
			categoryId: req.params.idCategoria
		}).then(join => {
			res.status(200).send(join);
		})
		.catch(next);

	});



// S17 --> DELETE: Para eliminar una relación 

	server.delete('/:idProducto/category/:idCategoria', isAdmin, (req, res, next) => {

		prod_cat.findOne({ 
			where: { 
				productId: req.params.idProducto,
				categoryId: req.params.idCategoria
			} 
		})
		.then((relacion)=>{
			relacion.destroy();
		}).then((detruida)=> res.status(200).send(detruida)).catch(next);
	
	});


/*			 ____________________________________________________________________________
			||																			||
			||					>>>>>>>>>> REVIEW <<<<<<<<<<						||
			||				------->>> Rutas POST,GET,PUT y DELETE <<<-------			||
			||__________________________________________________________________________||
			|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|<<<<<>>>>>|
*/


	// S54 POST - Crear ruta para agregar/crear Review

server.post('/:id/review', (req, res, next) => {
	// if(!req.body.title || !req.body.description || !req.body.rating || !req.body.userId ) {
	// 	res.status(400)
	// 	res.send('No se permiten campos indefinidos')
	// }
	// else {
		Reviews.create({
			title: req.body.title,
			description: req.body.description,
			rating: req.body.rating,
			userId: req.body.userId,
			productId: req.params.id
		}).then(review => {
			res.status(201)
			console.log(review)
			res.send(review)
		}).catch(error => {
			console.log(error)
			res.sendStatus(400)
		})
	// }
})

// S57 GET - Crear ruta para traer todas las reviews de un producto

server.get('/:id/review/', (req, res, next) => {
	Reviews.findAll({
		where: {
			productId: req.params.id }, 
		include: {
			model: User, 
			 attributes: ['name']
		}
	})
	.then((reviews => {
		res.send(reviews);
		console.log(reviews)
	}))
		.catch(error => {
			console.log(error)
			res.sendStatus(400)
		})
	})

// S55 PUT - Modificar una review

	server.put('/review/:id', (req, res, next) => {
		Reviews.findByPk(req.params.id)
		.then(review => {
			if(!req.body.title || !req.body.description || !req.body.rating) {
				res.status(400)
				res.send('Cuidado! No se permiten campos indefinidos.')
			}
			review.title = req.body.title;
			review.description = req.body.description;
			review.rating = req.body.rating;
			return review.save();
		}).then(r => res.status(200).send(r)).catch(next);
	})

// S56 DELETE - Eliminar una review

	server.delete('/review/:id', (req, res, next) => {
		Reviews.findByPk(req.params.id)
		.then(review => review.destroy())
		.then(r => res.status(200).send("Fue eliminado con éxito!"))
		.catch(next)
	})

	module.exports = server;