const mongoose=require('mongoose');
const contactSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'users'
    },
    name:{type:String,
    required:true},
    email:{type:String,
        required:true},
    phone:{type:String,
        },
    type:{
        type:String,
        default:'personal'
    },
    date:{type:Date,
        required:true,
        default:Date.now},        
});

module.exports=mongoose.model('contact',contactSchema);
