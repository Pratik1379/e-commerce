const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema( {
    product_name: String,
    retail_price: Number,
    discounted_price: Number,
    image: [String],
    description: String,
    product_rating: String,
    overall_rating: String,
    brand: String

})

module.exports = mongoose.model('Product', productSchema);