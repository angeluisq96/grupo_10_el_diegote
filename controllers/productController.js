const fs = require('fs')
const path = require('path')

const jsonPath = path.join(__dirname, '../database/products.json')
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) 

let productsController = {
    index: (req,res) => {
        res.render('index', {products: products})
    },
    description: (req,res) => {
        for(let i = 0; i < products.length; i++)
        if(products[i].id == req.params.id){
            let product = products[i]
            let editURL = "/products/" + req.params.id + "/edit"
            res.render('productdescription', {product: product, editURL: editURL})
        }
    },
    edit: (req,res) => {
        for(let i = 0; i < products.length; i++)
        if(products[i].id == req.params.id){
            let = product = products[i]
            res.render('edit', {product: product})  
        }
    },
    create: (req,res) => {         
        res.render('create')
    },
    store: (req,res) => {
        let product = req.body
        product.id = Math.random()
        product.image =  "/images/" + (req.file?req.file.filename : '')
        products.push(product)

        fs.writeFileSync(jsonPath, JSON.stringify(products,null,''))
        res.redirect('/')
    },
    update: (req,res) => {
        console.log('Entro Aqui')
        for(let i = 0; i < products.length; i++)
        if(products[i].id == req.params.id){
            let newProduct = req.body
           newProduct.id = req.params.id
           newProduct.image =  req.file? "/images/" + req.file.filename : products[i].image
           products[i] = newProduct 
        }

        fs.writeFileSync(jsonPath, JSON.stringify(products, null, ''))
        res.redirect('/')
    },
    delete: (req,res) => {
        for(let i = 0; i < products.length; i++)
        if(products[i].id == req.params.id) products.splice(i,1)

        fs.writeFileSync(jsonPath, JSON.stringify(products, null, ''))
        res.redirect('/') 
    },
}

module.exports = productsController