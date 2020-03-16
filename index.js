const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!')
  })
  
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/hello', function(req, res){
    if(req.query.nom == "" || req.query.nom == undefined){
        res.send('Quel est votre nom ?');
    } else {
        res.send('Bonjour ' + req.query.nom)
    }
})

app.post('/chat', function(req, res){
    if(req.body.msg != undefined){
        var msg = req.body.msg
        var index = msg.indexOf('=')
        console.log(msg);
        if(msg.indexOf('=') == -1){
            fs.readFile("./reponses.json", (err, data) => {
                if(data != undefined){
                    if(data.length == 0){
                        res.send("Je ne connais pas " + msg + ".");
                    } else {
                        if (err) throw err;
                            let demain = JSON.parse(data);
                            if(demain.demain !== undefined){
                                res.send("demain: " + demain.demain)
                            }
                    }
                } else {
                    res.send("Je ne connais pas " + msg + ".");
                }
            });
        } else {
            let key = msg.substring(0, index)
            let value = msg.substring(index+1, msg.length)
            let content = {
                demain: value
            }
            fs.writeFile("./reponses.json",JSON.stringify(content), error => {
                if(error){
                    console.error(error);
                }
                res.send("Merci pour cette information.")
            })
        }
    }
});