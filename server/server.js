const express = require('express')
const cors = require('cors')
const ProductModel = require('./Product')
const mongoose = require('mongoose')


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Company')
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

//Register API Route
app.post('/addProduct',(req,res)=>{
    ProductModel.create(req.body)
    .then(res.json('Data Saved Successfully'))
    .catch(err=>res.json(err))
})

//Read - REST API Route
app.get('/viewProducts', (req,res)=>{
    ProductModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//Get By ID 
app.get('/user/:id', (req,res)=>{
    UserModel.findById(req.params.id)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//Delete - REST API Route
app.delete('/deleteProduct/:id', (req,res)=>{
    console.log(req.params.id)
    ProductModel.deleteOne({_id:req.params.id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
//Update - REST API Route
app.put('/update/:id', (req,res)=>{
    const id = req.params.id
    const { name, email,phone,location } = req.body
    console.log(id + ',' + name +','+ email+','+phone+','+location)   
    try {
        const updatedUser = UserModel.findByIdAndUpdate(id,req.body)
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json('updated'+ updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

//config PORT and Start Server
const PORT = 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

