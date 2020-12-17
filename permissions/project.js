const {ROLE} = require('../data')

function canViewProject(user, project){
    return (
        user.role === ROLE.ADMIN ||
        user.id === project.userId
    )
}

module.exports = {
    canViewProject
}