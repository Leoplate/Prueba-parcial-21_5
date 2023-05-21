const express = require('express')

const tipo = require('../dato/tipoProductos.json')


const tipoAll = (req, res) => {
    const tabla = tipo.filter(data => data.enabled == true)
    res.status(200).json(tabla)
}





module.exports = { tipoAll }