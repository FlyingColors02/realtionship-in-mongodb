let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/staticDataStoring")
        .then(()=>console.log("database got connected"))
        .catch(error=>console.log(`something went wrong!! ${error.message}`));

let AuthorSchema = new mongoose.Schema({
    name:{type:String},
    website:{type:String}
})

let CourseSchema = new mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    author:{type:AuthorSchema}
})

let AuthorModel = mongoose.model("authors",AuthorSchema);
let CourseModel = mongoose.model("bookscollections",CourseSchema);

async function createAuthor(name,website){
   let newData = new AuthorModel(
       {
        name:name,
        website:website
       }
   ) 
   let data= await newData.save();
}

async function createCourse(name,price,author){
    let newData= new CourseModel(
        {
            name:name,
            price:price,
            author:author
        }
    )
    let data  =  await newData.save();
}

//createAuthor("J.K Rowling","www.Rowling.com");
//  createCourse("harry Potter and the half blood prince",300,new AuthorModel(
//     {
//      name:"J.K Rowling",
//      website:"www.Rowling.com"
//     }));

async function AllCourseData(){
    let data = await CourseModel
    .find()
    .populate("authors","name-_id");
    console.log(data);
}
AllCourseData();