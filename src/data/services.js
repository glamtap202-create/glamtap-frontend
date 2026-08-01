
const services = [
   {
    id: 1,
    category: "Waxing",
    name: "Full Arms & Full Legs + Underarms",
    duration: "30 MINS",
    description: "Choose From Honey, Rica or Roll On Wax | Underarm Peel Off",
    booked: "4.7k+",
    options: true,
    image: "/images/wax1.png",

    prices: {
      Honey: {
        oldPrice: 850,
        price: 599,
      },
      Rica: {
        oldPrice: 950,
        price: 699,
      },
      RollOn: {
        oldPrice: 1100,
        price: 999,
      },
    },
  },

  {
    id: 2,
    category: "Waxing",
    name: "Full Arms + Underarms",
    duration: "15 MINS",
    description: "Honey or Rica | Underarms Peel Off",
    booked: "4.8k+",
    options: true,
    image: "/images/wax2.webp",

    prices: {
      Honey: {
        oldPrice: 350,
        price: 299,
      },
      Rica: {
        oldPrice: 450,
        price: 399,
      },
      
    },
  },

  {
    id: 3,
    category: "Waxing",
    name: "Full Arm & Leg + Underarms Roll On Waxing",
    duration: "45 MINS",
    description: "Choose From Honey, Rica or Roll On Waxing",
    booked: "6.1k+",
    options: false,
    image: "/images/wax3.webp",
oldPrice:1200,
price:900,
    
  },

  {
    id: 4,
    category: "Waxing",
    name: "Full Body Waxing - Rica",
    duration: "45 MINS",
    description: "Choose From Except Face, Bikini & Butt Area",
    booked: "6.8k+",
    options: false,
    image: "/images/wax4.png",

    oldPrice: 3000,
    price: 2499,
    discount: 16,
  },

  {
    id: 5,
    category: "Waxing",
    name: "Full Leg Waxing",
    duration: "20 MINS",
    description: "Choose Option Honey or Rica",
    booked: "7.2k+",
    options: true,
    image: "/images/wax5.webp",

    prices: {
      Honey: {
        oldPrice: 350,
        price: 249,
      },
      Rica: {
        oldPrice: 450,
        price: 349,
      },
      RollOn: {
        oldPrice: 550,
        price: 449,
      },
    },
  },

  {
    id: 6,
    category: "Waxing",
    name: "Full Back Waxing",
    duration: "20 MINS",
    description: "Cover Area From Shoulder To Pelvis",
    booked: "3.9k+",
    options: true,
    image: "/images/wax6.png",

    prices: {
      Honey: {
        oldPrice: 400,
        price: 299,
      },
      Rica: {
        oldPrice: 500,
        price: 399,
      },
      RollOn: {
        oldPrice: 600,
        price: 499,
      },
    },
  },
  {
    id: 7,
    category: "Waxing",
    name: " Bikni Waxing - Peel Off",
    duration: "15 MINS",
    description: "Only Cover Full Bikni Area & Bikini Line",
    oldPrice: 1500,
    price: 799,
    discount: 46,
    booked: "4.9k+",
     options: false,
    image:
      "/images/wax7.webp",
  },

  {
    id: 8,
    category: "Waxing",
    name: " Underarm Waxing",
    duration: "10 MINS",
    description: "Peel OFF",
    oldPrice: 149,
    price: 149,
    discount: 0,
    booked: "4.1k+",
     options: false,
    image:
      "https://i.pinimg.com/736x/ba/8c/19/ba8c1976c1fbea7ac963d79292a75fae.jpg",
  },

  {
  id: 9,
  category: "Waxing",
  name: "Half Leg Waxing",
  duration: "15 MINS",
  description: "Cover Area From Toes To Knees",
  
  discount: 28,
  booked: "4.3k+",
  options: true,
  image: "/images/wax9.webp",
  prices:{
    Honey:{
      oldPrice:350,
      price:249,
    },
    Rica:{
      oldPrice:400,
      price:399,
    }
  }
},

{
  id: 10,
  category: "Waxing",
  name: "Half Back Waxing",
  duration: "15 MINS",
  description: "Choose From Honey or Rica",
 
  discount: 33,
  booked: "4.5k+",
  options: true,
  image: "/images/wax10.png",
   prices:{
    Honey:{
      oldPrice:350,
      price:249,
    },
    Rica:{
      oldPrice:400,
      price:399,
    }
  }


},

{
  id: 11,
  category: "Waxing",
  name: "Half Front Waxing",
  duration: "10 MINS",
  description: "Face, Bikini & Butt Area",
  
  discount: 28,
  booked: "3.6k+",
  options: true,
  image: "/images/wax11.png",
   prices:{
    Honey:{
      oldPrice:350,
      price:249,
    },
    Rica:{
      oldPrice:400,
      price:399,
    }
  }

},

{
  id: 12,
  category: "Waxing",
  name: "Butt Waxing",
  duration: "10 MINS",
  description: "Only Covers Buttocks | Bikini Not Included",
  oldPrice: 250,
  price: 149,
  discount: 40,
  booked: "2.5k+",
  options: true,
  image: "/images/wax12.png",
   prices:{
    Honey:{
      oldPrice:250,
      price:149,
    },
    Rica:{
      oldPrice:400,
      price:399,
    }
  }

},

  

   // ================= FACIAL =================
    {
    id: 13,
    category: "Facial",
    name: "Aroma Fruit Facial",
    duration: "45 MINS",
    description: "5 Steps Facial | Exfoliating Sheet Mask",
    oldPrice: 1000,
    price: 799,
    discount: 20,
    booked: "3.4k+",
     options: false,
    image:
      "/images/Facial1.webp",
  },
    {
    id: 14,
    category: "Facial",
    name: "Skin Tighting Facial",
    duration: "60 MINS",
    description: "Only Covers Buttocks | Bikini Not Included",
    oldPrice: 1500,
    price: 1049,
    discount: 30,
    booked: "5.3k+",
     options: false,
    image:
      "/images/facial2.webp",
  },
    {
    id: 15,
    category: "Facial",
    name: "Anti Ageing Facial",
    duration: "60 MINS",
    description: "Only Covers Buttocks | Bikini Not Included",
    oldPrice: 1600,
    price: 1199,
    discount: 25,
    booked: "3.6k+",
     options: false,
    image:
      "/images/facial3.webp",
  },
    {
    id: 16,
    category: "Facial",
    name: "O3+ Detan Facial",
    duration: "60 MINS",
    description: "4 Step Facial",
    oldPrice: 1800,
    price: 1399,
    discount: 22,
    booked: "3.1k+",
     options: false,
    image:
      "/images/facial4.webp",
  },
    {
    id: 17,
    category: "Facial",
    name: "Aroma Vitamin-c Facial",
    duration: "45 MINS",
    // description: "Only Covers Buttocks | Bikini Not Included",
    oldPrice: 1600,
    price: 1399,
    discount: 45,
    booked: "4.2k+",
     options: false,
    image:
      "/images/facial5.webp",
  },
 
  {
    id: 19,
    category: "Facial",
    name: "Korean Facial",
    duration: "90 MINS",
    // description: "Only Covers Buttocks | Bikini Not Included",
    oldPrice: 1600,
    price: 1399,
    discount: 12,
    booked: "3.8k+",
     options: false,
    image:
      "/images/facial6.webp",
  },
    {
    id: 20,
    category: "Facial",
    name: "O3+ Shine & Glow Facial",
    duration: "60 MINS",
    description: "7 Step Facial",
    oldPrice: 2000,
    price: 1599,
    discount: 20,
    booked: "4.7k+",
    options: false,
    image:
      "/images/facial7.webp",
  },
    {
    id: 21,
    category: "Facial",
    name: "O3+ Vitamin-c Facial",
    duration: "90 MINS",
    description: "Only Covers Buttocks | Bikini Not Included",
    oldPrice: 3200,
    price: 2399,
    discount: 25,
    booked: "2.3k+",
     options: false,
    image:
      "/images/facial8.webp",
  },
    {
    id: 22,
    category: "Facial",
    name: "O3+ Bridal Facial",
    duration: "90 MINS",
    // description: "Only Covers Buttocks | Bikini Not Included",
    oldPrice: 3500,
    price: 2499,
    discount: 28,
    booked: "2.5k+",
     options: false,
    image:
      "/images/facial9.webp",
  },
  //  ==================CleanUp===================================

    {
    id: 23,
    category: "CleanUp",
    name: "Fruit CleanUp",
    duration: "45 MINS",
    description: "Fruit",
    oldPrice: 800,
    price: 649,
    discount: 18,
    booked: "3.9k+",
     options: false,
    image:
      "/images/clean1.webp",
  },
    {
    id: 24,
    category: "CleanUp",
    name: "Korean CleanUp",
    duration: "45 MINS",
    description: "Korean",
    oldPrice: 1200,
    price: 799,
    discount: 33,
    booked: "3.1k+",
     options: false,
    image:
      "/images/clen2.webp",
  },
     {
    id: 25,
    category: "CleanUp",
    name: "O3+ whighting CleanUp",
    duration: "45 MINS",
    description: "O3+ whighting ",
    oldPrice: 1500,
    price: 999,
    discount: 33,
    booked: "2.7k+",
    options: false,
    image:
      "/images/clean3.webp",
  },


  // =====================Hair spa ==========================
    {
    id: 26,
    category: "Hair",
    name: "Hair Colour Root Touch Up ( Application Only )",
    duration: "25 MINS",
    description: "Touch Up Only With Customer's Product",
    oldPrice: 500,
    price: 399,
    discount: 20,
    booked: "6.1k+",
    options: false,
    image:
      "https://i.pinimg.com/736x/2c/ce/d0/2cced00490fa6a80864cefa91c218b50.jpg",
  },
    {
    id: 27,
    category: "Hair",
    name: "Loreal Hair Spa",
    duration: "45 MINS",
    description: "Loreal Hair ",
    oldPrice: 800,
    price: 699,
    discount: 12,
    booked: "4.8k+",
    options: false,
    image:
      "https://i.pinimg.com/1200x/83/08/ae/8308ae065f6981ce3716760be8124943.jpg",
  },
    {
    id: 28,
    category: "Hair",
    name: "Head Massage",
    duration: "45 MINS",
    // description: "O3+ whighting",
    oldPrice: 250,
    price: 169,
    discount: 32,
    booked: "760+",
     options: false,
    image:
      "https://i.pinimg.com/1200x/95/ff/b3/95ffb30dc92b73c62d6aaaeea49e85e7.jpg",
  },
  // =========================Bleach & D-tan============================
  {
    id: 29,
    category: "Bleach & D-tan",
    name: "Full Leg D-tan",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 700,
    price: 549,
    discount: 21,
    booked: "3.1k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Leg-Detan.jpg?v=1773394418&width=600",
  },
  {
    id: 30,
    category: "Bleach & D-tan",
    name: "Full Body D-tan",
    duration: "60 MINS",
    // description: "O3+ whighting",
    oldPrice: 1700,
    price: 1399,
    discount: 17,
    booked: "4.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-Body-Detan_e39fdea2-2c77-4296-a7c9-0afee5589c38.jpg?v=1773394397&width=600",
  },
   {
    id: 31,
    category: "Bleach & D-tan",
    name: "Full Front D-tan",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 500,
    price: 399,
    discount: 20,
    booked: "3.7k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Chest-Detan.jpg?v=1773394391&width=600",
  },
  {
    id: 32,
    category: "Bleach & D-tan",
    name: "Face & Neck D-tan",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 500,
    price: 399,
    discount: 20,
    booked: "3.8k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Face-and-Neck-Detan_99b6bb32-dd59-465d-a430-1bd414edddf8.jpg?v=1773394385&width=600",
  },
  {
    id: 33,
    category: "Bleach & D-tan",
    name: "Full Back D-tan",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 600,
    price: 499,
    discount: 16,
    booked: "2.7k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Back-Detan.jpg?v=1773394343&width=600",
  },
  {
    id: 34,
    category: "Bleach & D-tan",
    name: "Full Arms D-tan",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 500,
    price: 399,
    discount: 20,
    booked: "1.8k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/full-arma-detan.jpg?v=1774609887&width=600",
  },
  {
    id: 35,
    category: "Bleach & D-tan",
    name: "Underarms D-tan",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 200,
    price: 199,
    discount: 25,
    booked: "1.7k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Under-arm-bleach_25f36d3f-2672-49e7-9b64-406261488d15.jpg?v=1774609695&width=600",
  },
  {
    id: 36,
    category: "Bleach & D-tan",
    name: "Full Legs Beach",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 700,
    price: 499,
    discount: 28,
    booked: "2.3k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Leg-Bleach.jpg?v=1773394242&width=600",
  },
  {
    id: 37,
    category: "Bleach & D-tan",
    name: "Full Body Bleach",
    duration: "60 MINS",
    // description: "O3+ whighting",
    oldPrice: 1500,
    price: 1099,
    discount: 26,
    booked: "3.4k++",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-Body-Bleach.jpg?v=1773394231&width=600",
  },
  {
    id: 38,
    category: "Bleach & D-tan",
    name: "Full Arms Bleach",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 700,
    price: 499,
    discount: 28,
    booked: "3.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-Arm-Bleach.jpg?v=1773394224&width=493",
  },
  {
    id: 39,
    category: "Bleach & D-tan",
    name: "Half front Bleach",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 400,
    price: 249,
    discount: 37,
    booked: "897+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Chest-Bleach.jpg?v=1773394210&width=493",
  },
  {
    id: 40,
    category: "Bleach & D-tan",
    name: "Face & Neck Bleach",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 350,
    price: 299,
    discount: 14,
    booked: "1.9k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Face-and-Neck-Bleach.jpg?v=1773394192&width=493",
  },
  {
    id: 41,
    category: "Bleach & D-tan",
    name: "Full Back Bleach",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 500,
    price: 399,
    discount: 20,
    booked: "1.7k+",
   options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/back-Bleach_50f4e127-33b6-4467-b554-7c46c4d32589.jpg?v=1773394174&width=493",
  },
  {
    id: 42,
    category: "Bleach & D-tan",
    name: "Underarms Bleach",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 200,
    price: 99,
    discount: 50,
    booked: "2.5k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Under-arm-bleach.jpg?v=1774609597&width=600",
  },
  
  {
    id: 44,
    category: "Bleach & D-tan",
    name: "Half Back Bleach",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 400,
    price: 299,
    discount: 25,
    booked: "2.4k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Hlaf-Back-Bleach.jpg?v=1774609584&width=600",
  },
  // ===============================Threading & Facewax Threading & Facewax+++=========================
 {
    id: 45,
    category: "Threading & Facewax ",
    name: "Full Face Threading",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 300,
    price: 199,
    discount: 33,
    booked: "2.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-Face-Threading.jpg?v=1774608981&width=493",
  },
   {
    id: 46,
    category: "Threading & Facewax ",
    name: "Eye Brow Threading",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 60,
    price: 49,
    discount: 18,
    booked: "970+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Eyebrow.jpg?v=1773410068&width=600",
  },
   {
    id: 47,
    category: "Threading & Facewax ",
    name: "Upper lips Threading",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 50,
    price: 29,
    discount: 42,
    booked: "2.7k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Upper-Lips.jpg?v=1773410087&width=600",
  },
   {
    id: 48,
    category: "Threading & Facewax ",
    name: "Forehead Waxing",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 100,
    price: 59,
    discount: 41,
    booked: "3.6k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Forehead-waxing.jpg?v=1773908809&width=600",
  },
   {
    id: 49,
    category: "Threading & Facewax ",
    name: "Side Lock Waxing",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 150,
    price: 99,
    discount: 34,
    booked: "6.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Side-Lock-Waxing.jpg?v=1774521794&width=600",
  },
   {
    id: 50,
    category: "Threading & Facewax ",
    name: "Chin Waxing",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 80,
    price: 49,
    discount: 25,
    booked: "1.5k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Chin-Waxing.jpg?v=1773908528&width=600",
  },
   {
    id: 51,
    category: "Threading & Facewax ",
    name: "Full Face Waxing",
    duration: "20 MINS",
    // description: "O3+ whighting",
    oldPrice: 500,
    price: 999,
    discount: 20,
    booked: "4.7k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-Face-Waxing.jpg?v=1773908311&width=600",
  },
   {
    id: 52,
    category: "Threading & Facewax ",
    name: "Side Locks Threading",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 80,
    price: 299,
    discount: 59,
    booked: "1.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Side-Lock.jpg?v=1773410186&width=600",
  },
   {
    id: 53,
    category: "Threading & Facewax ",
    name: "Upper Lips Waxing",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 80,
    price: 49,
    discount: 38,
    booked: "4.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Upper-Lips-Waxing.jpg?v=1773908968&width=600",
  },
   {
    id: 54,
    category: "Threading & Facewax ",
    name: "Lower Lips Threading",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 50,
    price: 29,
    discount: 42,
    booked: "2.3k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Lower-Lips_5b42f49e-57cb-4539-9b81-25e2de957e4f.jpg?v=1773410241&width=600",
  },
   {
    id: 55,
    category: "Threading & Facewax ",
    name: "Chin Threading",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 50,
    price: 29,
    discount: 42,
    booked: "1.3k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Chin_6bce842a-25e0-418e-b2a2-d6ff5f57d8eb.jpg?v=1773410223&width=600",
  },
   {
    id: 56,
    category: "Threading & Facewax ",
    name: "Forehead Threading",
    duration: "10 MINS",
    // description: "O3+ whighting",
    oldPrice: 60,
    price: 39,
    discount: 35,
    booked: "2.2k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Forehead_afffa5c6-ad7c-4a33-a0fc-d45883aa4e03.jpg?v=1773410205&width=600",
  },
   {
    id: 57,
    category: "Threading & Facewax ",
    name: "Lower Lips Waxing",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 80,
    price: 49,
    discount: 38,
    booked: "3.4k+",
    options: false,
    image: "https://glowmetro.com/cdn/shop/files/Lowe-Lips-Waxing.jpg?v=1773909228&width=600",
  },
  // ++++++++++++++++++++++++++++Body Massage=========================
  {
    id: 58,
    category: "Body Massage ",
    name: "Full Body Massage (with stretching)",
    duration: "60 MINS",
    // description: "O3+ whighting",
    oldPrice: 1200,
    price: 999,
    discount: 16,
    booked: "5.3k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Body-Massage--2.jpg?v=1774598035&width=493",
  },
  {
    id: 59,
    category: "Body Massage ",
    name: "Foot Massage",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 250,
    price: 199,
    discount: 20,
    booked: "450+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Foot-Massage_4d38f3d8-16d1-4229-b9e4-ab1842374b70.jpg?v=1773410518&width=493",
  },
  {
    id: 60,
    category: "Body Massage ",
    name: "Head Massage",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 250,
    price: 169,
    discount: 32,
    booked: "760+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Head-Massage_a72769f6-32f4-4a95-8265-062707959cee.jpg?v=1773410486&width=493",
  },

  // -----------------------------Body Polishing-----------------------------------
{
    id:61,
    category: "Body Polishing ",
    name: "Body Polishing ( 3 Step )",
    duration: "45 MINS",
    // description: "O3+ whighting",
    oldPrice: 2500,
    price: 1799,
    discount: 32,
    booked: "2.1k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/body-polishing-3-step_41b75752-e452-40c7-be5c-94ac72d8afb9.jpg?v=1774606976&width=600",
  },
  {
    id:62,
    category: "Body Polishing ",
    name: "Body Polishing (5 Step)",
    duration: "90 MINS",
    // description: "O3+ whighting",
    oldPrice: 3500,
    price: 2399,
    discount: 31,
    booked: "4.8k+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Polishing-5-Step.jpg?v=1774607003&width=600",
  },
  {
    id:63,
    category: "Body Polishing ",
    name: "Full Body Scrubbing",
    duration: "60 MINS",
    // description: "O3+ whighting",
    oldPrice: 1200,
    price: 799,
    discount: 33,
    booked: "2.9k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-body-Scrubbing.jpg?v=1774608310&width=600",
  },
  

  {
    id:64,
    category: "Body Polishing ",
    name: "Full Back Scrubbing",
    duration: "30 MINS",
    // description: "O3+ whighting",
    oldPrice: 700,
    price: 499,
    discount: 28,
    booked: "1.3k+",
    options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-back-Scrubbing.jpg?v=1774607880&width=600",
  },
  {
    id:65,
    category: "Body Polishing ",
    name: "Half Leg Scrubbing",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 250,
    price: 169,
    discount: 32,
    booked: "760+",
     options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Full-back-Scrubbing.jpg?v=1774607880&width=600",
  },
  {
    id:66,
    category: "Body Polishing ",
    name: "Half Leg Scrubbing",
    duration: "15 MINS",
    // description: "O3+ whighting",
    oldPrice: 500,
    price: 299,
    discount: 40,
    booked: "1.1k+",
   options: false,
    image:
      "https://glowmetro.com/cdn/shop/files/Half-Leg-Crubbing.jpg?v=1774607715&width=600",
  },
  // ================-------------------combo-----------------------------
{
  id: 67,
  category: "Combo Package",
  name: "Basic Monthly Grooming Combo",
  duration: "75 MINS",
description: " Includes,Fruit CleanUp & Full Arms & Half Legs Waxing (Honey) + Eyebrows & Upper Lip Threading",
  oldPrice: 1500,
  price: 1149,
  discount: 23,
  booked: "6k+",
  options: false,
  image: "/images/Combo.webp",

  content: {
    includes:
      "Fruit CleanUp & Full Arms & Half Legs Waxing (Honey) + Eyebrows & Upper Lip Threading",

    about:
      "Basic Monthly Grooming Combo is our best-selling package for ladies who want to look neat, clean, and glowing every month. Get all your 3 main services — waxing, threading, and cleanup — done in one go.",

    benefits: [
      {
        title: "1. Full Arms & Full Legs Waxing (Honey Wax)",
        whatIs:
          "Complete waxing of both hands and legs using natural Honey Wax.",
        benefit:
          "Honey Wax is very gentle on the skin. It removes hair from the root and leaves the skin smooth.",
        result:
          "Smooth, hair-free arms and legs that last for weeks.",
      },
      {
        title: "2. Eyebrows & Upper Lip Threading",
        whatIs:
          "Precise shaping of eyebrows and clean removal of upper lip hair using threading.",
        benefit:
          "Threading gives sharper, more defined shape than waxing or trimming, with no skin irritation.",
        result:
          "Neatly defined brows and a clean upper lip.",
      },
      {
        title: "3. Fruit CleanUp",
        whatIs:
          "A refreshing facial cleanup using fruit-based products to remove dirt, oil, and dead skin from the face.",
        benefit:
          "Deeply cleanses pores and gives instant freshness and glow to the skin.",
        result:
          "Radiant, refreshed, and glowing skin.",
      },
    ],

    whyBook: [
      "Expert female partners.",
      "100% safe & hygienic products.",
      "Branded & single-use products.",
      "All 3 services in one affordable combo.",
      "6k+ women have already booked this combo.",
    ],
  },
},
  {
    id:68,
    category: "Combo Package ",
    name: "Instant Glow & Detan Combo",
    duration: "120 MINS",
    description: "Includes,Blossom kochhar facial with Seed mask & full arms & underarms & Full Legs Waxing (Rica) & Face Detan & eyebrows & upper lip threading ",
    oldPrice: 2200,
    price: 1999,
    discount: 9,
    booked: "7.5k+",
   options: false,
    image:
      "/images/combo3.webp",
  },
  {
    id:69,
    category: "Combo Package ",
    name: "Glow & Shine",
    duration: "90 MINS",
    description: " Includes, Aroma Magic Fruit Facial with sheet mask & Full Arms + underarms & Half Legs Waxing (Rica)  &  Bikini (Brazilian Peel Off) & Face Bleach/Detan & Eyebrows & Upper Lip Threading",
    oldPrice: 2700,
    price: 2449,
    discount: 7,
    booked: "8k+",
   options: false,
    image:
       "/images/combo4.webp",
  },
  {
    id: 70,
    category: "Combo Package ",
    name: "Premium O3+ Beauty Combo",
    duration: "15 MINS",
    description: "Includes,O₃+ Facial & Face+Neck  & Detan/Bleach & Full Arms + underarms Full Legs Waxing (Rica ) & Bikini (Brazilian Peel Off) & Sara Pedicure + Eyebrows & Upper Lip Threading ",
    oldPrice: 4750,
    price: 3599,
    discount: 24,
    booked: "3.7k+",
   options: false,
    image:
      "/images/combo5.webp",
  },
];


export default services;

