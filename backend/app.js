/*
    Isaac Ingles
    Server for Node social media app
*/

// Using ESM so we can use ES6

// Core Node modules
import path from 'path'
import fs from 'fs'

// NPM packages
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import multer from 'multer'
import { sock } from './socket'

/*
    Importing morgan the old way because the ES6 way 
    gives an error; apparently this is an ongoing 
    issue with morgan. 
*/
const morgan = require('morgan')

//App Constants
const app = express()

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000

//For morgan -- logging to a file instead of the console
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
//Append to the file instead of overwriting it each time
{ flags: 'a'}
)

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

//Route Imports
import { feedRouter } from './routes/feed.routes'
import { authRouter } from './routes/auth.routes'
import { userRouter } from './routes/user.routes'
// import { Socket } from 'dgram' //where did this come from??

//Helmet
app.use(helmet())

//Compression
app.use(compression())

//Morgan (Logging)
app.use(morgan('combined', {
    stream: accessLogStream
}))

//Cross Origin middleware
app.use(cors())

//application/json
app.use(bodyParser.json());
 
//Multer file upload handling
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
})
//image = field name for incoming data
.single('image'))


//Serve the images folder statically
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/feed', feedRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

//Error handling

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    
    res.status(status).json({ message, data})
})

//Connect to Atlas/Mongo
mongoose
    .connect(MONGODB_URI, {
    useUnifiedTopology: true
})
.then(result =>{
    console.log('Database connection successful')
    const server = app.listen(PORT, console.log(`Server listening on port ${PORT}`))

    //set up socket.io
    const io = sock.init(server)

    io.on('connection', socket => {
        console.log('Client connected')
    })
})
.catch(err => {
    console.log(err)
})