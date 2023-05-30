const mongoose =require('mongoose')

const userSchema =mongoose.Schema({
    text:{
        type: String,
        required: [true, 'please add text']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)