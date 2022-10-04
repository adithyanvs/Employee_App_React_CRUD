const mongoose = require("mongoose")

const DB = "mongodb+srv://adithyanvs:aswinvs@cluster0.lqmwe4c.mongodb.net/mernstack?retryWrites=true&w=majority"


mongoose.connect(DB,{
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message))