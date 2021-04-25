const app = require('./server')
const PORT = process.env.PORT || 3000;

//const require db

app.listen(PORT, () => {
  console.log(`Listening on ${[PORT]}`)
})
