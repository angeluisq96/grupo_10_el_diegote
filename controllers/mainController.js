const fs = require('fs')
const path = require('path')

const jsonPath = path.join(__dirname, '../database/products.json')
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) 

const controller = {
	index: (req, res) => {
		return res.render('index', {products: products});
	}
}

module.exports = controller;