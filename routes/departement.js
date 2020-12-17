const express = require('express')
const deptRouter = express.Router()
const {departements} = require('../data')


deptRouter.get('/',(req,res) => {
    res.send(departements)
})

deptRouter.get('/:deptId',setDeparetement,setToUpperCase ,(req,res) => {
    res.send(req.dept)
})

function setDeparetement(req,res, next){
    const deptId = parseInt(req.params.deptId)
    req.dept = departements.find(dept => dept.id === deptId)
    if(req.dept == null){
        res.status(404)
        return res.send("dept not found")
    }
    next()
}

function setToUpperCase(req,res,next){
    req.dept.name.toUpperCase()
    next()
}


module.exports = deptRouter

