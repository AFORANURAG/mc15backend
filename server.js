const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const {connection} =require("./config/db.config");
const server = http.createServer(app);
const {Usermodel} = require("./models/User.model")
const {UserRouter}  =require("./routes/authentication.route");
// const {validator} = require("./middlewares/jwtvalidator")
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use("/auth",UserRouter)
const io = require("socket.io")(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})

app.get("/",(req,res)=>{
    res.json({message:"welcome to base route"})
})

io.on('connection', async(socket) => {
  socket.on("updatesocketid",async(email)=>{
    console.log(`connection successfull with socket of  ${email}`)
try {
    await Usermodel.findOneAndUpdate({email},{socketId:socket.id})
} catch (error) {
    console.log(`error while updating the socket id`,error)
}
  })
 
  socket.on("message",async(data)=>{
    console.log(`here is the ${data[1]}`)
  
    let userto = await Usermodel.findOne({email:data[1]});
    console.log(userto,socket.id,userto.socketId)   
socket.broadcast.to(userto.socketId).emit("reply",data[0])

  })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(3000,async()=>{
    try{
        await connection;
        console.log(`connected to database successfully`);
        console.log("listening on port 3000")

}catch(err){
    console.log(`error while connecting to the database `,err)
}
})