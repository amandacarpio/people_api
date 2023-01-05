require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const { PORT = 3000, DATABASE_URL } = process.env // this is the same thing as const PORT = process.env.PORT || 3000

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
.on('open', () => console.log('You are connected to mongoose'))
.on('close', () => console.log('You are disconnected from mongoose'))
.on('error', (error) => console.log('There is an error'))

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model('People',  PeopleSchema)

//middleware
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/people', async (req, res) => {
    try{
        res.json(await People.find({}))
    }catch(error){
        res.status(400).json(error)
    }
})

app.post('/people', async (req, res) => {
    try{
        res.json(await People.create(req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

app.put('/people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    }catch(error){
        res.status(400).json(error)
    }
})

app.delete('/people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndDelete(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

app.get('/people/:id', async (req, res) => {
    try{
        res.json(await People.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))