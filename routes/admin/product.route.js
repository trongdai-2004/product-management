const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validates/admin/product.validate")
router.get('/', controller.index)
const storageMulter = require("../../helpers/storageMulter")
const multer = require('multer')
const upload = multer({ storage: storageMulter() })
router.get('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)
router.delete('/delete/:id', controller.deleteItem);
router.get('/create', controller.create)

router.post(
    '/create',
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);
router.get("/edit/:id", controller.edit)


router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
); 
    
    
module.exports = router;