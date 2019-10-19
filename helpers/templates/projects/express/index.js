const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

var routing_data = fs.readFileSync('routes.json')
routing_data = JSON.parse(routing_data)

routing_data.forEach((x) => {
  if(x.type == "text"){
    app.get(x.route, (req, res) => {
      res.send(x.data);
    });
  }else if(x.type == "js"){
    var teplate_data.page() = require(`./templates/${x.data}`);
    app.get(x.route, (req, res) => {
      res.send(teplate_data.page());
    });
  }
})

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
