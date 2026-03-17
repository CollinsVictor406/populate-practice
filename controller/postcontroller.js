const Blog = require("../model/blogmodel")
const User = require("../model/usermodel")

exports.createBlog = async (req,res) =>{
    const { title,body } = req.body
    try{
       const user = await User.findById(req.user.id)
       if(!user){
        return res.status(404).json({message:"User not found"})
       }
       const post = new Blog({ title,body,author:user._id })
       const savedPost = await post.save()
       return res.status(201).json({savedPost,message:"Post created successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

