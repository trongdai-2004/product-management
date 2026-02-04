const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus");
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
       
        let keyword = "";

        if ( req.query.keyword){
                keyword = req.query.keyword;
                const regex = new RegExp(keyword, "i");
                
                find.title =  regex;
        }
        const products = await Product.find(find);

           
        

        console.log(products)
          res.render("admin/pages/products/index", {
                pageTitle: "Danh sách sản phẩm",
                products: products,
                filterStatus: filterStatus,
                keyword: keyword

        })
}