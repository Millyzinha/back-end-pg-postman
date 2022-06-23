const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const routes = require('./src/queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        //padrão principal é string ou array = false
        extended:true
    })
)

app.get('/',(request,response) => {
    response.json({info:'CONECTADO COM SUCESSO!!'})
})

app.get('/task', routes.getTasks)
app.get('/task/:id', routes.getTaskById)
app.post('/task', routes.createTask)
app.put('/task/:id', routes.updateTask)
app.delete('/task/:id', routes.deleteTask)


app.listen(PORT, ()=>{
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})