const authModel = require('../model/auth.model');
module.exports={
    homePage: async(req,res)=>{
        // console.log(req.session.userid);
        // res.json(authModel.getSession())
        // console.log(req.session.user.userID)
        res.render("homepage",{user: req.session.user});
    }
}