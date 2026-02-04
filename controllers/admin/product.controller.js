const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
// [GET] /adfmin/products

module.exports.index= async (req, res) => {
        const filterStatus = filterStatusHelpers(req.query);
        

//        đoạn bộ lộc
        let find = {
                deleted: false, 
               
                

        };

        if ( req.query.status){
                 find.status =  req.query.status
        }

        const objectSearch = searchHelpers(req.query);
       
        

        if ( objectSearch.regex){
                
                find.title =  objectSearch.regex;
        }
        const products = await Product.find(find);

           
        

        console.log(products)
          res.render("admin/pages/products/index", {
                pageTitle: "Danh sách sản phẩm",
                products: products,
                filterStatus: filterStatus,
                keyword: objectSearch.keyword

        })
}