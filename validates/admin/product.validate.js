module.exports.createPost = (req,res,next) =>{
      if(!req.body.title){
             req.flash('error', `vui lòng nhập tiêu đề !`);  
             res.redirect(req.get("Referer"));
             return;

       }
       next();
}