const userModel = require('../model/user.model');
// const authModel = require('../model/auth.model');

module.exports={
    //[GET] /login
    login: async(req,res)=>{
        res.render("vwAuth/Login");
    },
    //[POST] /login
    handleLogin: async(req, res)=>{
        var username = req.body.username;
        var password = req.body.password;

        var result = await userModel.checkUser(username, password);
        if(result[0] != null){
            let userID = result[0].id.toString();
            let fullname = result[0].fullname;
            let address = result[0].address;
            let avatar = result[0].avatar;
            let gender = result[0].gender;
            let password = result[0].password;
            let phoneNumber = result[0].phonenum;
            let tikixu = result[0].tikixu;
            let username = result[0].username;
            let dob = result[0].dateofbirth;
            let userInfo = {userID: userID, fullname:fullname, avatar:avatar,address:address,gender:gender,password:password, phoneNumber:phoneNumber, tikixu:tikixu, username:username,dob:dob};
            req.session.user = userInfo;
            if(String(username) === "admin"){
                res.redirect('/admin');
            }else if(String(username) === "nguoibanhang"){
                res.redirect('/seller');
            }else{
                res.redirect('/');
            }
            
        }else{
            res.redirect('/login');
        }
    },
    //[GET] /logout
    logout: async(req, res)=>{
        req.session.destroy();
        res.locals.isUser = false;
        res.redirect('/login');
    },
    //[GET] /register
    sign_up: async(req, res) =>{
        res.render("vwAuth/SignUp");
    },
    //[POST] /register
    handleSign_up: async(req, res) =>{
        var username = req.body.username;
        var password = req.body.password;
        var fullname = req.body.fullname;
        var phoneNumber = req.body.phoneNumber;
        var gender = req.body.gender;
        var dob = req.body.dob;
        var avatar = req.body.avatar;
        var address = req.body.address;

        var result = userModel.storeUser(username, password, fullname, phoneNumber, gender, dob, avatar, address);
        res.redirect(`/login`);
    },
    //[GET]
    find_pass: async(req, res) =>{
        res.render("vwAuth/FindPass");
    }
}