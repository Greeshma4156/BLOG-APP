import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js"; 

export const userRoute=exp.Router()

//Register user
userRoute.post(
        "/users",
        upload.single("profileImageUrl"), // multer middleware to handle file upload
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );

//Authenticate user


//Read all articles

userRoute.get('/articles',async(req,res)=>{
    let articles=await ArticleModel.find({isArticleActive:true}).populate("author", "firstName")
    res.status(200).json({message:"Articles",payload:articles})
})

userRoute.get('/articles/:articleId',async(req,res)=>{
    const { articleId } = req.params
    let article=await ArticleModel.findOne({_id:articleId, isArticleActive:true}).populate("comments.user", "email firstName").populate("author", "firstName email")
    if(!article){
        return res.status(404).json({message:"Article not found"})
    }
    res.status(200).json({message:"Article",payload:article})
})

//Add comment to an article

userRoute.post('/articles/:articleId',verifyToken("USER"),async(req,res)=>{
    const { articleId } = req.params
    let {comment}=req.body
    let articleOfDB=await ArticleModel.findOne({_id:articleId})
    if(!articleOfDB){
        return res.status(404).json({message:"Article not found"})
    }
    //update the article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,
        {$push:{ comments:{user, comment }}},
        { new:true}).populate("");
        //send res(updated article)
     res.status(200).json({message:"Article updated",payload:updatedArticle})
})