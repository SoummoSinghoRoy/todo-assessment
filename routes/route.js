const authRoute = require('./authRoute');
const todoWorkRoute = require('./todoWorkRoute');

const routes = [
  {
    path: '/api/todo',
    handler: todoWorkRoute
  },
  {
    path: '/api/auth',
    handler: authRoute 
  },
  {
    path: '/',
    handler: (req, res) => {
      res.send('Server is running....')
    }
  },
]

module.exports = (app) => {
  routes.forEach(route => {
    if(route.path == '/') {
      app.get(route.path, route.handler)
    } else{
      app.use(route.path, route.handler)
    }
  })
}