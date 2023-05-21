const express = require('express')

const rutaTipo = require('./demo.routers/tipoRouter')
const produRouter = require('./demo.routers/productosRouter')

const app = express()


app.use(express.json())

const PORT = process.env.PORT | 3000

app.listen(PORT, ()=>{console.log("WE ARE USING PORT "+ PORT)})

app.use('/tipo',rutaTipo)
app.use('/productos', produRouter)
