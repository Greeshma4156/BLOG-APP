import exp from "express";
import { authenticate,register } from "../services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { checkAuthor } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

export const authorRoute=exp.Router()

//Register author
authorRoute.post('/users', upload.single("profileImageUrl"), async(req,res, next)=>{
    let cloudinaryResult;

    try {
        let userObj=req.body;

        if (req.file) {
            cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        }

        const newUserObj=await register({
            ...userObj,
            role:"AUTHOR",
            profileImageUrl: cloudinaryResult?.secure_url,
        })
        res.status(201).json({message:"Author created",payload:newUserObj})

    } catch (err) {
        if (cloudinaryResult?.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        }
        next(err);
    }
});


//Authenticate author

//create article
authorRoute.post('/articles',verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{
    //get article from req
    let article=req.body
    console.log(req.body.author)
    //create article document
    let newArticleDoc=new ArticleModel(article)
    //save
    let createdArticleDoc=await newArticleDoc.save()
    //send res
    res.status(201).json({message:"article created",payload:createdArticleDoc})
})


//Get article with full comments for author
authorRoute.get('/articles/:articleId/comments', verifyToken("AUTHOR"), async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user.userId;
  
  const article = await ArticleModel.findOne({ 
    _id: articleId, 
    author: userId 
  })
    .populate('author', 'firstName email')
    .populate('comments.user', 'email firstName');
    
  if (!article) {
    return res.status(404).json({ message: "Article not found or access denied" });
  }
  
  res.status(200).json({ 
    message: "Article comments", 
    payload: { 
      ...article.toObject(), 
      comments: article.comments || [] 
    } 
  });
});

//Read articles of author
authorRoute.get('/articles/:authorId',verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{
    //get author id
     let aid=req.params.authorId;
    //read articles by this author which are active
let articles=await ArticleModel.find({author:aid}).populate("author","firstName email").populate("comments.user", "email firstName")
    //send res
    res.status(200).json({message:"articles",payload:articles})
})

//Edit article
authorRoute.put('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    //get modified article from req
    console.log(req.body);
  let author = req.user.userId;
  //get modified article from req
  let { articleId, title, category, content } = req.body;
  console.log(articleId, author);
  //find article
  let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author });
  console.log(articleOfDB);
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }

  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });
});



//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});