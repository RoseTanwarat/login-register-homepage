const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
// const knex = require('knex');

// const db = knex({
//     client:'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: 'Tanwarat1818',
//         database: 'loginform'
//     }
// })

// ---------------------sequelize------------------------
// database
// const db = require('./config/database')

// const Sequelize = require('sequelize');
// // Option 3: Passing parameters separately (other dialects)
// const db = new Sequelize('loginsequelize', 'postgres', 'twrrose', {
//   host: 'localhost',
//   dialect:'postgres'
// });

// // test db
// db.authenticate()
// .then (() => console.log('Database connected.....'))
// .catch (err => console.log('Error:' + err))

// const db = require('./db/index.js');
const { User, Role } = require('./models');
// console.log('1111111')
const role = require('./models/role');
// db.sequelize.sync();

const app = express();
let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));
// app.use(cors())
app.get('/',(req,res) => {
    res.sendFile(path.join(intialPath,"index.html"));
})

app.get('/get-user-admin',async (req, res) => {
    const { email} = req.query;
    console.log('email---->', email)
try {
    const user = await User.findOne({
        include: { model: Role, as: 'role' },
        where: { email: email },
        attributes: ['email', 'name']
    })
    console.log('useremail---->',user.dataValues.role.dataValues.name)
    if (user.dataValues.role.dataValues.name === 'admin') {
        res.json(user)
    } else {
        res.json('error')
    }
} catch (error) {
    res.json('error')
}
    
})

app.get('/user-all', async (req, res) => {
    console.log(5555555555555555);
    const user = await User.findAll({
        include: { model: Role, as: 'role' }
    })
    res.json(user)
})

app.get('/role-all',async (req,res) => {
    const roles = await Role.findAll()
    res.json(roles)
})

app.get('/user-one',async (req,res) => {
    const { email } = req.query; 
    console.log('email---->', email)
    const user = await User.findOne({
        include: { model: Role, as: 'role' },
        where: { email: email },
        attributes: ['email', 'name']
    })
    //console.log('useremail---->',user.dataValues)
    res.json(user)
    
})

app.get('/register',(req,res) => {
    res.sendFile(path.join(intialPath,"register.html"));
})

app.get('/login',(req,res) => {
    res.sendFile(path.join(intialPath,"login.html"));
})

app.get('/admin-page',(req,res) => {
    res.sendFile(path.join(intialPath,"admin-page.html"));
})

app.post('/register-user',async (req,res) => {
    const { name, email, password, selectRole } = req.body;
    //console.log('ค่าจากหน้าบ้าน ---->',req.body)
    try {
    if(!name.length || !email.length || !password.length ){
        res.json('fill all the fields');
    } else{
        const checkEmail = await User.findOne({where:{email:email},attributes: ['email']});
        console.log(checkEmail);
        if (checkEmail && checkEmail.dataValues){
            res.json('email alredy exists');
        }else {
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            roleId: selectRole    //if fig id = 1 ทุกคนจะเป็น admin
        });
        const dataUser = {name:user.dataValues.name, email:user.dataValues.email} // สร้างตปมาเก็บ.obj
        console.log('ข้อมูล Register ---->',dataUser);
        res.json(dataUser); //สงไปหน้าบ้าน
        }
    }
    } catch (err) {
        console.log('Error regis---->',err)
    }
})

// app.post('/register-user', (req,res) => {
//     const { name, email,password } = req.body;
//     if(!name.length || !email.length || !password.length){
//         res.json('fill all the fields');
//     } else{
//         db("User").insert({
//             name: name,
//             email: email,
//             password: password
//         })
//         .returning(["name","email"])
//         .then(data => {
//             res.json(data[0])
            
//         })
//         .catch(err => {
//             if (err.detail.includes('already exists')){
//                 res.json('email alredy exists');
//             }
//         })
//     }
// })

app.post('/login-user',async (req,res) => {
    try {
        const { email,password } = req.body;
        const user = await User.findOne({
        where:{
            email:email,
            password:password 
        },
        attributes: ['name','email']
    });
        console.log('ข้อมูลตัวใหญ่ ---->',user);
        if(user && user.dataValues){
            // if(user.dataValues.role){
            //     res.json({
            //         name: user.dataValues.name,
            //         email: user.dataValues.email,
            //         role: user.dataValues.role.dataValues.role
            //     })
            // }
            res.json(user.dataValues)
        }else{
            res.json('email or password is incorrect');
        } 
    } catch (error) {
        console.log('Error login---->',error);
    }
    
    // const { email,password } = req.body;
    // db.select('name', 'email')
    // .from('User')
    // .where({
    //     email: email,
    //     password: password
    // })
    // .then(data => {
    //     if(data.length){
    //         res.json(data[0]);
    //     }else{
    //         res.json('email or password is incorrect');
    //     }
    // })
})

app.get('/test',(req,res)=>{
    const test = User.findAll();
    console.log(test);
})

app.listen(3000, (req,res) => {
    console.log('listening on port 3000.....')
})






