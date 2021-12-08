const express = require('express')
const router = express.Router()

const path = require('path')

const productsController = require('../controllers/productController')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
       cb(null, path.join(__dirname,'/../public/images'))
    },
    filename: (req,file,cb) => {
        const name = Math.random() + path.extname(file.originalname)
        cb(null, name)
    }
})

const upload = multer({storage: storage})


// router.get('/', productsController.index)

router.post('/', upload.single('image'),productsController.store)
// router.post('/',productsController.store)

router.get('/create', productsController.create)

router.get('/:id', productsController.description)

router.get('/:id/edit', productsController.edit)

router.put('/:id', upload.single('image'), productsController.update)

router.delete('/:id', productsController.delete)

module.exports = router