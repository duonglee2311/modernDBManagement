const userModel = require('../model/user.model')

module.exports={
    //[GET] /user
    getUser: async(req,res)=>{
        // userModel.getUser();
        var result =await userModel.getAllUser();
        // console.log('result: ',result);
        // res.json(result);
        res.render("vwUser/Index",{
            user:result,
            layout: 'admin',
        });
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
        res.render('vwUser/Create',{
            layout: 'admin',
        });
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
        var result = userModel.updateUser(id,username, password, fullname, phoneNumber, gender, dob, avatar, address);
        if(req.session.user.permission == 'admin'){
            res.redirect(`/user`);
        }else{
            res.redirect(`/user/profile/`+req.session.user.userID);
        }
        
    },
    //[GET] /user/:id/delete
    deleteUser(req, res){
        var id = req.params.id;
        var result =userModel.deleteUser(id);
        res.redirect(`/user`);
    },
    //[GET] /user/profile/:id
    profileUser:async(req, res)=>{
        let temp = await userModel.getOneUser(req.params.id);
        // console.log(temp);
        var user;
        let userID = temp[0].id.toString();
        let fullname = temp[0].fullname;
        let address = temp[0].address;
        let avatar = temp[0].avatar;
        let gender = temp[0].gender;
        let password = temp[0].password;
        let phoneNumber = temp[0].phonenum;
        let tikixu = temp[0].tikixu;
        let username = temp[0].username;
        let dob = temp[0].dateofbirth;
        var user = {userID: userID, fullname:fullname, avatar:avatar,address:address,gender:gender,password:password, phoneNumber:phoneNumber, tikixu:tikixu, username:username,dob:dob};
        let layout = 'main';
        if(req.session.user.permission === 'admin'){
            layout = 'admin';
        }else if(req.session.user.permission === 'seller'){
            layout = 'seller'
        }
        res.render('vwuser/profile',{
            user : user,
            layout: layout
        });
    },
}