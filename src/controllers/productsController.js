const fs = require('fs')
const path = require('path')

const jsonPath = path.join(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) 

let productsController = {
    index: (req,res) => {
        res.render('index', {products: products})
    },
    description: (req,res) => {
        let product  = products[req.params.id]
        let editURL = "/products/" + req.params.id + "/edit"
        res.render('description', {product: product, editURL: editURL})
    },
    edit: (req,res) => {
        let product  = products[req.params.id]
        res.render('edit', {product: product})
    },
    create: (req,res) => {         
        res.render('create')
    },
    store: (req,res) => {
        let product = req.body
        product.id = products.length 
        product.image =  "/images/" + (req.file?req.file.filename : '')
        products.push(product)

        fs.writeFileSync(jsonPath, JSON.stringify(products,null,''))
        res.redirect('/products')
    },
    update: (req,res) => {
        let newProduct = req.body
        newProduct.id = req.params.id 
        newProduct.image =  req.file? "/images/" + req.file.filename : products[newProduct.id].image
        products[newProduct.id] = newProduct 

        fs.writeFileSync(jsonPath, JSON.stringify(products, null, ''))
        res.redirect('/products')
    },
    delete: (req,res) => {
        for(let i = 0; i < products.length; i++)
        if(products[i].id == req.params.id) products.splice(i,1)

        fs.writeFileSync(jsonPath, JSON.stringify(products, null, ''))
        res.redirect('/products') 
    },
}

module.exports = productsController