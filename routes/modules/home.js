const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  return User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        throw new Error('user not found')
      }
      return Todo.findALL({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })

    })
    .then(todos => { res.render('index', { todos }) })
    .catch(err => console.log(err))
})

module.exports = router