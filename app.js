const e = require('express');
const express= require('express')
const app=express();
const {graphqlHTTP}= require('express-graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString,GraphQLList, GraphQLSchema}=require('graphql')

const blogData=[
    {id:0,banner:"B1", content:"Blog Post 1",author:'Sam',about:'My name is sam. I enjoy blogging ', likes:2,unlikes:1,comment:"I love this",replies:"same here"},
    {id:1,banner:"B2", content:"Blog Post 2",author:'Mou',about:'My name is Mou. I enjoy blogging ',likes:3,unlikes:2,comment:"I like this",replies:"You do?"},
    {id:2,banner:"B3", content:"Blog Post 3",author:'Gad',about:'My name is Gad. I enjoy blogging ',likes:2,unlikes:0,comment:"You can do better",replies:"Thanks for the feedback"}
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
        },
        comment:{
            type: GraphQLString
        },
        replies:{
            type: GraphQLString
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

const mutants = new GraphQLObjectType({
    name:'Mutations',
    description:'This is the List of mutations',
    fields:{
        createBlog:{
            type:blogType,
            args:{
                
                banner:{
                    type:GraphQLString
                },
        
                content:{
                    type:GraphQLString
                },
                
                author:{
                    type:GraphQLString,
                    
                },
                about:{
                    type:GraphQLString
                },
                likes:{
                    type:GraphQLInt
                },
                unlikes:{
                    type:GraphQLInt
                },
                comment:{
                    type:GraphQLString
                },
                replies:{
                    type:GraphQLString
                }
                
                
                },
                resolve:(_,{banner,content,author,about})=> {
                    const newBlogPost={id:blogData.length,banner:banner, content:content,author:author,about:about,likes:likes=0,unlikes:unlikes=0,comment:comment="",replies:replies=""}
                    blogData.push(newBlogPost)
                    return newBlogPost
            }
            

            
        },
       
        likeBlog:{
            type:blogType,
            args:{
                id:{
                   type: GraphQLInt
                },
               
                
              },
              resolve:(_,{id})=>{
                    
                    const likeProfile= blogData[id]
                   
                    likeProfile.likes=likeProfile.likes+1
                    
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
            

            
        },

        updateBlog:{
            type:blogType,
            args:{
                
                id:{
                    type: GraphQLInt
                },
                banner:{
                    type:GraphQLString
                },
        
                content:{
                    type:GraphQLString
                }
                
                
                },
                resolve:(_,{id,banner,content})=> {
                    const blogUpdateData=  blogData[id]
                    blogUpdateData.content= content
                    blogUpdateData.banner= banner
                     return blogUpdateData
            }
            

            
        },

        commentBlog:{
            type:blogType,
            args:{
                
                id:{
                    type: GraphQLInt
                },
                comment:{
                    type:GraphQLString
                },
        
                
                
                
                },
                resolve:(_,{id,comment})=> {
                    const blogCommentData=  blogData[id]
                    blogCommentData.comment= blogCommentData.comment.concat(",",comment)
                    
                     return blogCommentData
            }
            

            
        },

        deleteCommentBlog:{
            type:blogType,
            args:{
                
                id:{
                    type: GraphQLInt
                },
                comment:{
                    type:GraphQLString
                },
        
                
                
                
                },
                resolve:(_,{id,comment})=> {
                    const blogDelComment=  blogData[id]
                    blogDelComment.comment= blogDelComment.comment.replace((","+comment)," ")
                    
                     return blogDelComment
            }

            
            

            
        },
        replyCommentBlog:{
            type:blogType,
            args:{
                
                id:{
                    type: GraphQLInt
                },
                replies:{
                    type:GraphQLString
                },
        
                
                
                
                },
                resolve:(_,{id,replies})=> {
                    const replyComment=  blogData[id]
                    
                    replyComment.replies= replyComment.replies.concat(",",replies)
                    
                     return replyComment
            }
        }
        
    }

})


const schema= new GraphQLSchema({query:rootQuery,mutation:mutants})

app.use('/',graphqlHTTP({
     schema,
     graphiql:true 
}))

const port= process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})