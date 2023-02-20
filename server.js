const express=require("express")
const mongoose=require("mongoose")

const helmet=require("helmet")
const rateLimit =require("express-rate-limit")
const mongoSanitize =require("express-mongo-sanitize")
const xss=require("xss-clean")
const hpp=require("hpp")
const cors=require("cors")
const bodyParser =require('body-parser');
require('dotenv').config()
const{readdirSync}=require('fs')
const path = require('path')



const app=express()

//security middleware......

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(bodyParser.json())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use(express.static(path.join(__dirname,"client_site/build")))



//rate limiting......
const rateLimiter=rateLimit({windowMs:15*60*1000,max:3000})
app.use(rateLimiter)


//routes........
readdirSync("./src/routes/").map(r =>app.use("/api/v1", require(`./src/routes/${r}`)))


//Database..........


const uri =process.env.DATABASE
const port=process.env.PORT ||8000



mongoose.connect(uri,
   (error) => {
    console.log(error)
   })
app.listen(port,(error)=>{

 if(error){
 console.log(error)
 }
else{console.log("Database Connection Sucess"+port)}
})




app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client_site','build','index.html'))
})