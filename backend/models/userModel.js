const mongoose =require('mongoose')

const userSchema =mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please add a name']
    },
    usermail:{
        type: String,
        required:[true, 'Please add an email'],
        unique: true
    },
    userage:{
        type: Number,
        required:[true, 'Please add the user age']
    },
    userpassword:{
        type: String,
        required:[true, 'Please add a password']
    },
    validuser:{
        type:Boolean,
        required:[true, 'Please confirm if the user is valid with true or false statement']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)