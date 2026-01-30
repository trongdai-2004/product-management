const homerouter = require("./home.route")
const productRouter = require("./product.route")
module.exports = (app)=>{
    app.use('/', homerouter)
        

    app.use('/products',productRouter  );
       
}
