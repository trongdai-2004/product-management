const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");


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
        // pagination

        const countProducts = await Product.countDocuments(find);

        let objectPagination = paginationHelpers({
                currentPage: 1,
                limitItems: 4
        },
        req.query,
        countProducts
);
        
                
        // end pagination



        const products = await Product.find(find).limit(objectPagination.limitItems).skip
        (objectPagination.skip);

           
        

        console.log(products)
          res.render("admin/pages/products/index", {
                pageTitle: "Danh sách sản phẩm",
                products: products,
                filterStatus: filterStatus,
                keyword: objectSearch.keyword,
                pagination: objectPagination

        });
}


// [GET] /adfmin/products/changeStatus/:status/:id

module.exports.changeStatus = async(req, res) =>{
        const status = req.params.status;
        const id = req.params.id;
        await Product.updateOne({_id: id }, {status: status });
        res.redirect("back");
}