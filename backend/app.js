/*
    Isaac Ingles
    Server for Node social media app
*/

//Using ESM so we can use ES6

//Core Node modules
import path from 'path'

//NPM packages
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'

//App Constants
const app = express()
const MONGODB_URI = 'mongodb+srv://demoUser:DagobahSystem@cluster0-rxesh.mongodb.net/messages?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000

//Uploading files with Multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //point at the images folder
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        //passing null for the error
        cb(null, `${new Date().toISOString()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(
    file.mimetype === 'image/png' || 
    file.mimetype === 'image/jpg' || 
    file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

//Route Constants
import { feedRouter } from './routes/feed.routes'

//Cross Origin middleware
app.use(cors())

//application/json
app.use(bodyParser.json());
 
//Multer file upload handling
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
})
//image = field name from incoming data
.single('image'))


//Serve the images folder statically
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/feed', feedRouter)

//Connect to Atlas/Mongo
mongoose
.connect(MONGODB_URI, {
    useUnifiedTopology: true
})
.then(result =>{
    console.log('Database connection successful')
    app.listen(PORT, console.log(`Server listening on port ${PORT}`))
})
.catch(err => {
    console.log(err)
})