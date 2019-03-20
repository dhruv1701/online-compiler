const express=require("express");
const bodyparser=require('body-parser');
const {spawn}=require("child_process");
const fs=require("fs");
const app=express();

app.use(bodyparser.json());
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended: true}));

app.post("/run",function(req,res){
    console.log(req.body);
    fs.writeFile("a.cpp",""+req.body.text,function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("file created");
            fs.writeFile("a.bat","g++ a.cpp\na\n",function(err){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("file created again");
                   var bat =spawn("cmd.exe",["/c","a.bat"]);
                   bat.stdout.on("data",function(data){
                        console.log(data.toString());
                   });
                   bat.stderr.on("data",function(data){
                        console.log(data.toString());
                   });
                   bat.on("exit",function(data){
                        console.log(data.toString());
                   });
                }
            });

        }
    })
});

app.listen(8080,function(){
    console.log('started on port 8080');
});