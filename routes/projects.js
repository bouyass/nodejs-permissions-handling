const express = require('express')
const router = express.Router()
const { projects, ROLE } = require('../data')
const {authUser} = require("../basicAuth")
const {canViewProject} = require('../permissions/project')



router.get('/',authUser, filterByRole, (req, res) => {
  res.json(req.projects)
})

router.get('/:projectId', setProject, authUser, authGetProject , (req, res) => {
  res.json(req.project)
})

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId)
  req.project = projects.find(project => project.id === projectId)
  
  if (req.project == null) {
    res.status(404)
    return res.send('Project not found')
  }
  next()
}


function filterByRole(req, re, next){
    req.user.role !== ROLE.ADMIN  ? req.projects = projects.filter(item => item.userId === req.user.id) : req.projects = projects
    next()
}

function authGetProject(req,res,next){
    if(!canViewProject(req.user, req.project)){
        res.status(401)
        return res.send("you cannot access this project")
    }

    next()
}


module.exports = router