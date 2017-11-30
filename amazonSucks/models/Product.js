let mongoose = require('mongoose');
let ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  orders: {type:Number,default: 0}
});

ProductSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);
