const { urlencoded } = require("express");
const express = require("express");

const userRouter = require("./routes/user");
const {connectMongoDB} = require("./connection");
//const users = require("./MOCK_DATA.json")

const app = express();

//connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-01");
//Middleware ->plugin 
app.use(urlencoded({extended: false}))

app.use("/user", userRouter);



//Dynamic paths with variables
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

app.listen(8000, () => console.log("Server is running at port 8000!"));