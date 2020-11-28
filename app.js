const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
})

app.post("/",function(req,res){
  const first_name=req.body.fname;
  const client_mail=req.body.mail;
  const last_name=req.body.lname;

  const data = {
    members: [
      {
        email_address: client_mail,
        status:  "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/d4fe3d53b1";

  const options = {
    method: "POST",
    auth: "deepak:33d368dbc53df0b1e9b5cb34b9e46325-us7"
  }
  const request = https.request(url, options, function(response){

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      });
  });

 request.write(jsonData);
 request.end();
//  console.log(first_name,last_name,client_mail);
})

app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

//API Key :33d368dbc53df0b1e9b5cb34b9e46325-us7

//List ID : d4fe3d53b1
