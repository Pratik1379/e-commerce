const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const Product = require('./models/Product.js');
const bodyParser = require('body-parser');
//const products = require('./productdf38641.json');

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/e-commerce', {useNewUrlParser: true, useCreateIndex : true, useUnifiedTopology: true});

app.get('/', async(req, res) => {
       await Product.find({}).sort(req.query.sort).exec((err, products) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { products: products });
        }
    });
    //res.send(products);
});

app.get('/search',(req,res)=>{  
    try {  
        Product.find({$or:[{product_name:{'$regex':req.query.dsearch}},{products:{'$regex':req.query.dsearch}}]},(err,products)=>{  
            if(err){  
                 console.log(err);  
                }   else{  
                    res.render('index',{products:products});  
                }  
            })  
      } catch (error) {  
        console.log(error);  
      }  
}); 


app.get('/:id', async(req, res) => {
    console.log(req.params);
    const {id} = req.params;
    console.log(id);
    const product = await Product.findById(id, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })

    res.render('show', {product})
})

app.listen(process.env.PORT || 3000, (req, res) => {
	console.log('Server started at port 3000!');
});
