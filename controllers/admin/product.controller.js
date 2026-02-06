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
        // pagination

        let objectPagination = {
                currentPage: 1,
                limitItems: 4
        };

        if (req.query.page){
                objectPagination.currentPage = parseInt(req.query.page);

        }

        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

        const countProducts = await Product.countDocuments(find);
        const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
        

        objectPagination.totalPage = totalPage;
        // console.log(objectPagination.currentPage)
        

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