const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mankmern:mankmern@mernproject.bicx37m.mongodb.net/gofood?retryWrites=true&w=majority";

const mongodb = async() =>{
    try{
        await mongoose.connect(mongoURI, {useNewUrlParser: true});
        console.log("connected");
        const fetched_data = mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray((err, data)=>{
            if (err) {
                console.log(err)
            }
            else {
                console.log()
            };
        });
    }
    catch(err){
        console.log(err);
    }  
}

module.exports = mongodb;
