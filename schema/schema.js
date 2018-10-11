const graphql = require('graphql')
const { find, filter } = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql
const Book = require('../../models/book')
const Author = require('../../models/author')

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
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, arg) {
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parents, arg) {
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})