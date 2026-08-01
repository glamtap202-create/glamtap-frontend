const Brand = require("../models/Brand");

// CREATE BRAND
exports.createBrand = async (req,res)=>{

  try{

    const brand = await Brand.create({
      name: req.body.name,
      logo: req.body.logo
    });

    res.status(201).json({
      success:true,
      brand
    });

  }catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

};


// GET BRANDS
exports.getBrands = async(req,res)=>{

  try{

    const brands = await Brand.find();

    res.json({
      success:true,
      brands
    });

  }catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

};