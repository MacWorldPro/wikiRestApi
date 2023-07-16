const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
  extended:true
}));

const dbUrl="mongodb+srv://ankush20386:3OljRtQxMH2xPkKQ@cluster0.nbjry1t.mongodb.net/wikiDB?retryWrites=true&w=majority";
const connectionParams={
  useNewUrlParser:true,
  useUnifiedTopology:true,
}
mongoose.connect(dbUrl,connectionParams);

const wikiSchema={
  title:String,
  content:String
};

const Article=mongoose.model("Article",wikiSchema);
app.get("/",(req,res)=>{
  res.render("index");
})
app.route("/articles")

.get((req,res)=>{
  async function getArticles(){
    try {
      const data=await Article.find();
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  };
  getArticles();
})

.post((req,res)=>{
  const newArticle=new Article({
    title:req.body.title,
    content:req.body.content
  });
  async function Save(){
    try {
      await newArticle.save();
      res.send("Saved Article Successfully.")
    } catch (e) {
      res.send(e);
    }
  }
  Save();
})

.delete((req,res)=>{
  async function articledelete(){
    try {
      await Article.deleteMany();
      res.send("All items Deleted Successfully");
    } catch (e) {
      res.send(e);
    }
  }

})

app.route("/articles/:articleTitle")

.get((req,res)=>{
  async function getArticle(){
    try {
      const data=await Article.findOne({title:req.params.articleTitle});
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  }
  getArticle();
})

.put((req,res)=>{
  async function updateArticle(){
    try {
      await Article.updateMany(
        {title: req.params.articleTitle},
        {$set:req.body},
      )
      res.send("Updated Successfully");
    } catch (e) {
      res.send("Error Occured");
    }
  };
  updateArticle();
})

.patch((req,res)=>{
  async function updateArticlePart(){
    try {
      await Article.updateMany(
        {title: req.params.articleTitle},
        {$set:req.body},
      )
      res.send("Updated Successfully");
    } catch (e) {
      res.send(e);
    }
  };
  updateArticlePart();
})

.delete((req,res)=>{
  async function articledeletesome(){
    try {
      await Article.deleteOne({title: req.params.articleTitle});
      res.send("Deleted the article Successfully");
    } catch (e) {
      res.send(e);
    }
  };
  articledeletesome();

})







app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});
