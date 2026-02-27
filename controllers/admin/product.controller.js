const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfiig = require("../../config/system")

// [GET] /admin/products

module.exports.index = async (req, res) => {
        const filterStatus = filterStatusHelpers(req.query);


        //        đoạn bộ lộc
        let find = {
                deleted: false,



        };

        if (req.query.status) {
                find.status = req.query.status
        }

        const objectSearch = searchHelpers(req.query);



        if (objectSearch.regex) {

                find.title = objectSearch.regex;
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



        const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitItems)
        .skip
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

module.exports.changeStatus = async (req, res) => {
        const status = req.params.status;
        const id = req.params.id;
        await Product.updateOne({ _id: id }, { status: status });
        req.flash('success', 'Cập nhật trạng thái sản phẩm thành công! ');
        res.redirect(req.get("Referer"));
}

// [PATCH]/admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
        const type = req.body.type;
        const ids = req.body.ids.split(",");

        switch (type) {
                case "active":
                        await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
                        req.flash('success', `Cập nhật trạng thái sản phẩm thành công ${ids.length} sản phẩm !`);
                        break;

                case "inactive":
                        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
                         req.flash('success', `Cập nhật trạng thái sản phẩm thành công ${ids.length} sản phẩm !`);
                        break;
                case "delete-all":
                        await Product.updateMany(
                                { _id: { $in: ids } },
                                {
                                deleted: true,
                                deletedAt: new Date()
                        })

                        req.flash('success', `đã xóa thành công ${ids.length} sản phẩm !`);
                        break;
                 case "change-position":
                        console.log(ids);
                        for (const item of ids) {
                                let [id,position] = item.split("-");
                                position = parseInt(position);
                              
                                await Product.updateOne({ _id: id }, {
                                        position: position
                                });
                                
                                        
                        }
                        req.flash('success', `đã đổi vị trí thành công ${ids.length} sản phẩm !`);
                        
                        
                        break;


                default:
                        break;
        }

        res.redirect(req.get("Referer"));
}

// [DELETE]/admin/products/delete/id
module.exports.deleteItem = async (req, res) => {

        const id = req.params.id;
        // await Product.deleteOne({_id: id });
        await Product.updateOne({ _id: id }, {
                deleted: true,
                deletedAt: new Date()
        });

         req.flash('success', `đã xóa thành công sản phẩm !`);    
        res.redirect(req.get("Referer"));
}



// [GET] /admin/products/create

module.exports.create = async (req, res) => {
      
        res.render("admin/pages/products/create", {
                pageTitle: "Thêm mới sản phẩm",
             
        });
}

// [POST] /admin/products/create

module.exports.createPost = async (req, res) => {
        console.log(req.file);
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        if(req.body.position == ""){
                const countProducts = await Product.countDocuments();
                req.body.position = countProducts + 1
                
        }else{
                req.body.position = parseInt(req.body.position);
        }
        req.body.thumbnail = `/uploads/${req.file.filename}`;

        const product = new Product(req.body);
        await product.save();


        res.redirect(`${systemConfiig.prefixAdmin}/products`)
}