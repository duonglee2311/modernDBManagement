const userModel = require('../model/user.model')

module.exports={
    //[GET] /user
    getUser: async(req,res)=>{
        // userModel.getUser();
        var result =await userModel.getAllUser();
        // console.log('result: ',result);
        // res.json(result);
        res.render("vwUser/Index",{user:result});
    },
    //[GET] /user/:id
    editUser: async(req, res) => {
        var id = req.params.id;
        // console.log(id);
        var result = await userModel.getOneUser(id);
        // res.json(result);
        res.render('vwUser/Edit',{user:result[0]});
    },
    //[GET] /user/create
    createUser: async(req, res) => {
        res.render('vwUser/Create');
    },
    //[POST] /user/create
    handleCreateUser(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var fullname = req.body.fullname;
        var phoneNumber = req.body.phoneNumber;
        var gender = req.body.gender;
        var dob = req.body.dob;
        var avatar = req.body.avatar;
        var address = req.body.address;

        var result = userModel.storeUser(username, password, fullname, phoneNumber, gender, dob, avatar, address);
        res.redirect(`/user`);
    },
    //[POST] /user/edit/:id
    handleEditUser(req, res){
        var id = req.params.id;
        var username = req.body.username;
        var password = req.body.password;
        var fullname = req.body.fullname;
        var phoneNumber = req.body.phoneNumber;
        var gender = req.body.gender;
        var dob = req.body.dob;
        var avatar = req.body.avatar;
        var address = req.body.address;
        // console.log(password);
        var result = userModel.updateUser(id,username, password, fullname, phoneNumber, gender, dob, avatar, address);
        res.redirect(`/user`);
    },
    //[GET] /user/:id/delete
    deleteUser(req, res){
        var id = req.params.id;
        var result =userModel.deleteUser(id);
        res.redirect(`/user`);
    },
    //[GET] /user/profile/:id
    profileUser(req, res){
        // console.log(req.session.user);
        res.render('vwuser/profile',{user : req.session.user});
    },
}