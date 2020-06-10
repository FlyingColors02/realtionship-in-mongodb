let mongoose=  require("mongoose");

mongoose.connect("mongodb://localhost/staticDataStoring",{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>console.log("database got connected"))
        .catch(error=>console.log(`something went wrong ${error.message}`));

let AuthorSchema = new mongoose.Schema({
    name:{type:String,min:3,max:10},
    website:{type:String},
    address:{type:String}
})

let AuthorModel = mongoose.model("authors",AuthorSchema);

let bookSchema = new mongoose.Schema({
    name:{type:String},
    isPublished:{type:String},
    type:[String],
    copies:{type:Number},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"authors"},
    date:{type:Date,default:Date.now()}
})

let BookModel = mongoose.model("bookscollections",bookSchema);

async function CreateAuthor(){
    let newData = new AuthorModel({
        name:"Richelle Mead",
        website:"www.mead.com",
        address:"USA"
    })
    let data = await newData.save();
    console.log(data);
}

async function CreateBook(name,isPublished,author,type,copies){
    let newData = new BookModel({
        name:name,
        isPublished:isPublished,
        author:author,
        type:type,
        copies:copies,
    })
    let data = await newData.save();
    console.log(data);
}

//CreateAuthor();
//CreateBook("Vampire Academy",true,"5eb2d7544bd214582cf7de0f","["romance","vampire","fantasy"]",32456789);

async function AllBookInfo(){
    let data = await BookModel
    .find()
    .populate("authors");
    console.log(data);
}
AllBookInfo();