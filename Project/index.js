const http = require("http");

http.createServer((req, res)=>{
    console.log("Http response received", req)
    //res.sendDate()
}).listen(5050,() => console.log("Server is started http://localhost:5000"))

