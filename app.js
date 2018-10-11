const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

const mongoUse = process.env.user
const mongoPass = process.env.password

mongoose.connect(`mongodb://${mongoUse}:${mongoPass}@ds127843.mlab.com:27843/react-graphql`)
mongoose.connection.once('open', () => {
  console.log('You are connected!')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(3000, () => {
  console.log('the app is listening on 3000')
})