const express = require('express')

const productos = require('../dato/productos.json')

const tipo = require('../dato/tipoProductos.json')


const productosAll = (req, res) =>{
    //const activos = tipo.filter(dato => dato.enabled == true)

    
    //const tabla = productos.filter(data => activos.find(dato => dato.idTipoProducto == data.idTipoProducto))
    
    res.status(200).json(productos)
}



const productosByID = (req, res) => {
    const id = req.params.id
    const respu = productos.findIndex(data => data.idProducto==id)
    
    if(respu>=0){
      const valido = tipo.findIndex(data => data.idTipoProducto==productos[respu].idTipoProducto)
          if(tipo[valido].enabled==true){
            const produFinal = productos[respu]
            const tipoFinal = tipo[valido]
             //res.json({tipoFinal})
            delete produFinal.idTipoProducto
            delete tipoFinal.enabled

            //res.status(200).json(productos[respu])

            res.status(200).json({...produFinal, tipoFinal})
          }else{
              res.status(404).json({"Mensaje":"El codigo "+id+" esta desactivado"})
          }  
         
    }else{
      res.status(404).json({"Mensaje": "El codigo "+id+" no existe"})
    }
}


const eliminarProducto = (req, res) => {
    const id = req.params.id
    const respu = productos.findIndex(data => data.idProducto==id)
          if(respu>=0){
               productos.splice(respu,1)
               res.status(200).json({"Mensaje": "Producto codigo "+id+" eliminado"})
          }else{
              res.status(404).json({"Mensaje":"Codigo "+id+" no existe"})
          }
}


const InsertarProducto = (req, res) => {
    const cuerpo = req.body
    const tabla = productos.map(data => data.idProducto)
    
      const maximo = productos.length > 0 ? Math.max(...tabla) + 1 : 1
      const tipoProdu = tipo.findIndex(dato => dato.idTipoProducto==cuerpo.idTipoProducto)  
      
       //res.json({tipoProdu})

      if(tipoProdu>=0){
            //const final = {
            //   idProducto: maximo,
            //   descripcion: cuerpo.descripcion,
            //   stock: 0,
            //   idTipoProducto: cuerpo.idTipoProducto
            //}

            const final = {"idProducto": maximo, "descripcion": cuerpo.descripcion,
                "stock": 0, "idTipoProducto": cuerpo.idTipoProducto}

               productos.push(final)
               res.status(201).json({"Mensaje":"Nuevo producto codigo "+maximo+" cargado"})
      }else{
          res.status(400).json({"Mensaje":"El codigo del producto no existe o esta desactivado"})
      }  
}


const modificarProducto = (req, res) => {
    const id = req.params.id
    const cuerpo = req.body
    const indice = productos.findIndex(data => data.idProducto == id)
        if(indice>=0){
            productos[indice].descripcion = cuerpo.descripcion
            productos[indice].stock = cuerpo.stock
            productos[indice].idTipoProducto = cuerpo.idTipoProducto
            res.status(201).json({"Mensaje":"Producto numero "+id+" modificado"})
        }else{
          res.status(404).json({"Mensaje":"Codigo "+id+" no existe"})
        }
}


module.exports = { productosAll, productosByID, eliminarProducto, InsertarProducto, modificarProducto }