const mongoos = require("mongoose")

//connect to mongodb
mongoos.connect('mongodb://127.0.0.1:27017/database', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connected'))
.catch(err => console.log(err));

//create user Schema

const userSchema = new mongoos.Schema({
    username:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        required : true
    }
})

// create user modle 
const User = mongoos.model('User',userSchema)

//export the user modle 
module.exports = User;
