const express = require('express');
const router = express.Router();
 const Model = require('../Model/model');
 const authModel = require('../Model/auth');

 

 router.post('/authUser',async (req,res)=>{
    const { username, password } = req.query;
    const data = new authModel({
        username:req.query.username,
        password : req.query.password
    });

    try {
        const user = await authModel.findOne({username });
        if(user){
            if(user.password == password && user.isVerify){
                res.json(user);
            }else{
                res.json({status:400});
            }
        }else{
            res.json({status:400});
        }
       
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});

router.post('/addUser',async (req,res)=>{
    const { username } = req.query;
    const data = new authModel({
        name:req.query.name,
        username : req.query.username,
        password : req.query.password,
        role:req.query.role,
        isVerify:req.query.isVerify
    });

    try {
        const email = await authModel.findOne({username });
        if(email != null){
            res.json("userexist");
        }else{
            const dataToSave = await data.save();
            res.send("Added Successfully...!!!");
        }
        
    } catch (error) {
        //res.status().send(400).json({message:error.message});
    }

});


router.post('/verifyUser',async (req,res)=>{
    try {
        const id = req.query.id;
        const body ={isVerify: req.query.isVerify};
        const options ={new :true}

        const result = await authModel.findByIdAndUpdate(id,body,options);
        res.json(result);

        //const result = await authModel.updateOne({"_id":id},{"password":body.password});

        // res.json(result);
    } catch (error) {
            res.status(400).json({message:error.message});
    }

});




router.patch('/update/:id', async (req,res)=>{

    try {
        const id = req.params.id;
        const body = req.body;
        const options ={new :true}

        const result = await authModel.findByIdAndUpdate(id,body,options);
        res.json(result);

        //const result = await authModel.updateOne({"_id":id},{"password":body.password});

        res.json(result);
    } catch (error) {
            res.status(400).json({message:error.message});
    }

});

router.get('/getUserRequests',async (req,res)=>{
    try {
        const user = await authModel.find({role:'user',isVerify:false});
        if(user){
                res.json(user);
        }else{
            res.json({status:400});
        }
       
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});

router.get('/getAllUsers',async (req,res)=>{
    try {
        const user = await authModel.find({});;
        if(user){
                res.json(user);
        }else{
            res.json({status:400});
        }
       
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});



router.get('/getTutorRequests',async (req,res)=>{
    try {
        const user = await authModel.find({role:'tutor',isVerify:false});
        if(user){
                res.json(user);
        }else{
            res.json({status:400});
        }
       
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});


 router.post('/post',async (req,res)=>{
    const data = new Model({
        name:req.body.name,
        age : req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});



router.get('/getAllData',async (req,res)=>{
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


router.get('/getOne/:id',async (req,res)=>{
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.patch('/update/:id', async (req,res)=>{

    try {
        const id = req.params.id;
        const body = req.body;
        const options ={new :true}

        const result = await Model.findByIdAndUpdate(id,body,options);
        res.json(result);
    } catch (error) {
            res.status(400).json({message:error.message});
    }

});

router.delete('/delete/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const data = await authModel.findByIdAndDelete(id);
        res.send(`document with ${data.name} is deleted...!!!`);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});



module.exports = router;