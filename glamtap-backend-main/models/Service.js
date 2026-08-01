const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
{
  category:{
    type:String,
    required:true,
  },

  salonId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Salon",
  },

  categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
  },


  name:{
    type:String,
    required:true,
  },


  duration:{
    type:String,
    required:true,
  },


  description:{
    type:String,
    default:"",
  },


  image:{
    type:String,
    default:"",
  },


  booked:{
    type:String,
    default:"0",
  },


  options:{
    type:Boolean,
    default:false,
  },


  prices:{
    Honey:{
      oldPrice:Number,
      price:Number,
    },

    Rica:{
      oldPrice:Number,
      price:Number,
    },

    RollOn:{
      oldPrice:Number,
      price:Number,
    },
  },


  oldPrice:{
    type:Number,
    default:0,
  },


  price:{
    type:Number,
    default:0,
  },


  discount:{
    type:Number,
    default:0,
  },


  rating:{
    type:Number,
    default:4.8,
  },


  totalReviews:{
    type:Number,
    default:0,
  },


  isAvailable:{
    type:Boolean,
    default:true,
  }

},
{
 timestamps:true
}
);


// Auto calculate price
serviceSchema.pre("save",function(next){

  if(this.options && this.prices){

    if(this.prices.Honey){
      this.oldPrice=this.prices.Honey.oldPrice;
      this.price=this.prices.Honey.price;
    }

    else if(this.prices.Rica){
      this.oldPrice=this.prices.Rica.oldPrice;
      this.price=this.prices.Rica.price;
    }

    else if(this.prices.RollOn){
      this.oldPrice=this.prices.RollOn.oldPrice;
      this.price=this.prices.RollOn.price;
    }

  }

  next();

});


module.exports = mongoose.model("Service",serviceSchema);