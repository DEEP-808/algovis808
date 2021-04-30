const express = require('express');
 
const app = express();

app.use(express.static('frontend'));


app.get("/resume", function(req, res){
    let path = __dirname+"/frontend/html/index.html";
    res.sendFile(path);
})
// Heroku will automatically set an environment variable called PORT
const PORT = process.env.PORT || 3000;
 
// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})