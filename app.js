const express= require('express')
const app=express();
const {graphqlHTTP}= require('express-graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString,GraphQLList, GraphQLSchema}=require('graphql')

const blogData=[
    {id:0,banner:"B1", content:"Blog Post 1",author:'Sam',about:'My name is sam. I enjoy blogging ', likes:2,unlikes:1},
    {id:1,banner:"B2", content:"Blog Post 2",author:'Mou',about:'My name is Mou. I enjoy blogging ',likes:3,unlikes:2},
    {id:2,banner:"B3", content:"Blog Post 3",author:'Gad',about:'My name is Gad. I enjoy blogging ',likes:2,unlikes:0}
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
        banner:{
            type:GraphQLString
        },

        content:{
            type:GraphQLString
        },
        
        author:{
            type:GraphQLString
        },
        about:{
            type:GraphQLString
        },
        likes:{
            type:GraphQLInt
        },
        unlikes:{
            type:GraphQLInt
        }

        
    }

})

const rootQuery = new GraphQLObjectType({
    name:'RootQuery',
    description:'This is the rootquery',
    fields:{
        blogs:{
            type:GraphQLList(blogType),
            resolve:()=> blogData   
        },
        blog:{
            type:blogType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(_,{id})=> blogData.find(blog=>blog.id==id)
        }
    }

})

//Mutations
const rootMutation = new GraphQLObjectType({
    name:'RootMutation',
    description:'This is the rootmutation',
    fields:{
       
        blog:{
            type:blogType,
            args:{
                
                banner:{
                    type:GraphQLString
                },
        
                content:{
                    type:GraphQLString
                },
                
                author:{
                    type:GraphQLString
                },
                about:{
                    type:GraphQLString
                },
                likes:{
                    type:GraphQLInt
                },
                unlikes:{
                    type:GraphQLInt
                }
                
                },
                resolve:(_,{banner,content,author,about,likes,unlikes})=> {
                    const newBlogPost={id:blogData.length+1,banner:banner, content:content,author:author,about:about, likes:likes,unlikes:unlikes}
                    blogData.push(newBlogPost)
                    return newBlogPost
            }
            

            
        },

       

       
    }
   

})
const likeMutation_and_unlike = new GraphQLObjectType({
    name:'Likemutaion',
    description:'This is the Likemutation',
    fields:{
       
        likeBlog:{
            type:blogType,
            args:{
                id:{
                   type: GraphQLInt
                },
               
                
              },
              resolve:(_,{id})=>{
                const likeProfile= blogData[id]
                console.log(likeProfile.likes)
                likeProfile.likes=likeProfile.likes+1
                console.log(likeProfile.likes)
                return likeProfile
            }
        },

        unlikeBlog:{
            type:blogType,
            args:{
                id:{
                   type: GraphQLInt
                },
               
                
              },
              resolve:(_,{id})=>{
                const unlikeProfile= blogData[id]
                
                unlikeProfile.unlikes+=1
                                              
                return unlikeProfile
            }
        },
        deleteBlog:{
            type:blogType,
            args:{
                
                id:{
                    type: GraphQLInt
                }
                
                },
                resolve:(_,{id})=> {
                    const blogdeletedata=  blogData[id]
                    const blogDelete= delete blogData[id]
                     return blogdeletedata
            }
            

            
        }
        
    }

})


const schema= new GraphQLSchema({query:rootQuery,mutation:rootMutation,mutation:likeMutation_and_unlike})

app.use('/',graphqlHTTP({
     schema,
     graphiql:true 
}))

const port= process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})