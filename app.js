const express= require('express')
const app=express();
const {graphqlHTTP}= require('express-graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString,GraphQLList, GraphQLSchema}=require('graphql')

const blogData=[
    {id:1, content:"Blog Post 1",author:'Sam'},
    {id:2, content:"Blog Post 2",author:'Mou'},
    {id:3, content:"Blog Post 3",author:'Gad'}
]

//Schema
//resolver

const blogType= new GraphQLObjectType({
    name:'Blog',
    description:'Fetch your favorite blogpost',
    fields:{
        id:{
            type:GraphQLInt
        },

        content:{
            type:GraphQLString
        },
        
        author:{
            type:GraphQLString
        }
    }

})

const rootQuery = new GraphQLObjectType({
    name:'RootQuery',
    description:'This is the rootquery',
    fields:{
        blog:{
            type:GraphQLList(blogType),
            resolve:()=> blogData   
        }
    }

})

const schema= new GraphQLSchema({query:rootQuery})

app.use('/',graphqlHTTP({
     schema,
     graphiql:true 
}))

const port= process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})