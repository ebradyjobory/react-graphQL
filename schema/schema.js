const graphql = require('graphql')
const { find, filter } = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql


// Dummy data
const books = [
  { id: '1', name: '300', genre: 'SciFi', authorId: '1' },
  { id: '2', name: 'The Martian', genre: 'SciFi', authorId: '2' },
  { id: '3', name: 'Less', genre: 'Education', authorId: '1' }
]

const authors = [
  { id: '1', name: 'Andy Weir' },
  { id: '2', name: 'Andrew Sean Greer' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parents, args) {
        return find(authors, { id: parents.authorId })
      }
    },
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, arg) {
        return filter(books, { authorId: parents.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parents, args) {
        // Fetch from DB
        return find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parents, args) {
        // Fetch from DB
        return find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, arg) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parents, arg) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})