const graphql = require('graphql');
const User    = require('../models/User');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name : 'User',
    fields : ()=> ({
        id : {
            type : GraphQLID
        },
        name : {
            type : GraphQLString
        },
        age : {
            type : GraphQLInt
        },
        email : {
            type : GraphQLString
        }
    })
})

const Query = new GraphQLObjectType({
    name : 'Query',
    fields : {
        user : {
            type : UserType,
            args : { id : {type : GraphQLID }},
            resolve(parent, args){
                return User.findById(args.id)
            }
        },
        users : {
            type : new GraphQLList(UserType),
            args : { id : {type : GraphQLID }},
            resolve(parent, args){
                return User.find({})
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addUser : {
            type : UserType,
            args : {
                id : { type : GraphQLID },
                name : {type : GraphQLString},
                age : {type : GraphQLInt},
                email : {type : GraphQLString},
            },
            resolve(parent, args){
                let user = new User({
                    id    : args.id,
                    name  : args.name,
                    age   : args.age,
                    email : args.email,
                })
                return user.save()
            }
        },
        removeUser : {
            type : UserType,
            args : {
                id : {
                    type : GraphQLID
                }
            },
            resolve(parent, args){
                return User.findByIdAndRemove(args.id)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query : Query,
    mutation : Mutation
})