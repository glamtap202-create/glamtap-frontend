const express = require("express");
const router = express.Router();

const {
    createBrand,
    getBrands
}=require("../controllers/brandController");


router.post("/",createBrand);

router.get("/",getBrands);


module.exports = router;