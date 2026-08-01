const mongoose = require("mongoose");
const Service = require("../models/Service");


// ================= CREATE SERVICE =================
const createService = async(req,res)=>{
  try{

    const service = await Service.create(req.body);

    res.status(201).json({
      success:true,
      service
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// ================= GET ALL SERVICES =================
const getAllServices = async(req,res)=>{
  try{

    const services = await Service.find()
      .populate("salonId")
      .populate("categoryId");


    res.status(200).json({
      success:true,
      total:services.length,
      services
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// ================= GET SINGLE SERVICE =================
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    let service;

    if (mongoose.Types.ObjectId.isValid(id)) {
      service = await Service.findById(id)
        .populate("salonId")
        .populate("categoryId");
    }

    if (!service) {
      service = await Service.findOne({
        name: { $regex: `^${id}$`, $options: "i" },
      })
        .populate("salonId")
        .populate("categoryId");
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ================= GET SERVICES BY CATEGORY =================
const getServicesByCategory = async (req, res) => {
  console.log("🔥 NEW CODE RUNNING 🔥");
  try {
    const slug = req.params.category
      .toLowerCase()
      .trim()
      .replace(/&/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    console.log("URL SLUG:", JSON.stringify(slug));

    const services = await Service.find()
      .populate("salonId")
      .populate("categoryId");

    const filteredServices = services.filter((service) => {
      const dbSlug = service.category
        .toLowerCase()
        .trim()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      console.log("DB CATEGORY:", JSON.stringify(service.category), "-> DB SLUG:", JSON.stringify(dbSlug));

      return dbSlug === slug;
    });

    // Duplicate services hatao (same name + price wale) — DB me accidental
    // duplicate documents ki wajah se ye zaroori hai jab tak DB clean nahi hota
    const seen = new Set();
    const uniqueServices = filteredServices.filter((service) => {
      const key = `${service.name}-${service.price}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    res.status(200).json({
      success: true,
      total: uniqueServices.length,
      services: uniqueServices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ================= SEARCH SERVICES =================
const searchServices = async(req,res)=>{

  try{

    const keyword=req.query.keyword || "";


    const services = await Service.find({

      name:{
        $regex:keyword,
        $options:"i"
      }

    });


    res.json({
      success:true,
      services
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};



// ================= FILTER SERVICES =================
const filterServices = async(req,res)=>{

 try{

  const {category,minPrice,maxPrice}=req.query;


  let query={};


  if(category){

    query.category={
      $regex:category,
      $options:"i"
    };

  }


  if(minPrice || maxPrice){

    query.price={};

    if(minPrice)
      query.price.$gte=Number(minPrice);


    if(maxPrice)
      query.price.$lte=Number(maxPrice);

  }


  const services=await Service.find(query);


  res.json({
    success:true,
    services
  });


 }catch(error){

  res.status(500).json({
    success:false,
    message:error.message
  });

 }

};



// ================= UPDATE SERVICE =================
const updateService = async(req,res)=>{

 try{

  const service=await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );


  res.json({
    success:true,
    service
  });


 }catch(error){

  res.status(500).json({
    success:false,
    message:error.message
  });

 }

};



// ================= DELETE SERVICE =================
const deleteService = async(req,res)=>{

 try{

  await Service.findByIdAndDelete(req.params.id);


  res.json({
    success:true,
    message:"Service deleted"
  });


 }catch(error){

  res.status(500).json({
    success:false,
    message:error.message
  });

 }

};



// ================= EXPORT =================

module.exports={
  createService,
  getAllServices,
  getServiceById,
  getServicesByCategory,
  searchServices,
  filterServices,
  updateService,
  deleteService
};