const router = require("express").Router();

const productController = require("../controllers/Product.controller");

// Public route to create a new product


router.get("/getlimitproduct", productController.getProducts);
router.post("/", productController.createProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/getprodata/:id", productController.getProductById);
router.put("/update/:id", productController.updateProduct);



module.exports = router;