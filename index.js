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

app.post('/chat', (req, res) => {
    let result = "";
    if(req.body.msg !== undefined){
        switch(req.body.msg){
            case 'ville':
                result = "Nous sommes à Paris.";
                break;
            case "meteo":
                result = "Il fait beau";
                break;
            default:
                result = req.body.msg;
                break;
        }
        
    } else {
        result = "Aucun message";
    }
    res.send(result);
})