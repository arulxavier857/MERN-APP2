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
app.post('/addProduct', async (req,res)=>{
   await ProductModel.create(req.body)
    .then(res.json('Data Saved Successfully'))
    .catch(err=>res.json(err))
})

//Read - REST API Route
app.get('/viewProducts', async (req,res)=>{
    await ProductModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//Get By ID 
app.get('/findProduct/:id', async (req,res)=>{
    console.log('Find Product:', req.params.id)
    await ProductModel.findById(req.params.id)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//Delete - REST API Route
app.delete('/deleteProduct/:id',async (req,res)=>{
    console.log(req.params.id)
    const deletedItem = await ProductModel.findByIdAndDelete({_id:req.params.id})
    .then(result=>res.json('Item Deleted Successfully!'))
    .catch(err=>res.json(err))
})
//Update - REST API Route
app.put('/editProduct/:id', async (req,res)=>  {
    const id = req.params.id
    console.log(id + ',' + req.body.name)   
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
        if (!updatedProduct) {
            return res.status(404).send('Item not found');
        }
        res.json('Product Updated Successfully');
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

