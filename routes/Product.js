const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const Product = require('../models/Product');
const check = require('../middleware/checkAdmin');

router.get('/', authenticate, check,function (req, res) {
    try {
        Product.find({}, (err, products) => {
            if (err) return res.send({ error: "some error occurred" });
            if (!products || !products.length) return res.send({ error: "some error occurred" });
            return res.send(products);
        })
    } catch (err) { console.log(err) }
})
router.get('/:id',authenticate, check, function (req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        Product.find({_id:id}, (err, product) => {
            if (err) return res.send({ error: "some error occurred" });
            if (!product || !product.length) return res.send({ error: "some error occurred" });

            return res.send(product[0]);
        })
    } catch (err) { console.log(err) }
})

router.post('/create', authenticate,  function (req, res) {
    try {
        const body = req.body
        newProduct = new Product(body);
        
        newProduct.save((err, product) => {
            if(err) return res.send({error: err});
            return res.send(product);
        });
      

    } catch (err) { console.log(err); }
})

router.put('/edit/:id',authenticate, check, function (req, res) {
    try {
        const body = req.body;

        const id = req.params.id;
        Product.findOneAndUpdate({ _id: id }, { ...body }, function (err, product) {
            if (err) return res.send({ error: "some error occurred" })
            if (!product) return res.send({ error: "not found" });
            return res.send({ edited: true });
        })

    } catch (err) {
        console.log(err);
    }
})

router.delete("/delete/:id",authenticate, check, function (req, res) {
    try {
        const { id } = req.params;
        Product.deleteOne({ _id: id }, function (err) {
            if (err) return res.send({ error: "some error occurred" })
            res.send({ deleted: true })
        })
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;