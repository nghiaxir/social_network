const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25,
        unique: true
    },
    email: {
        type: String,
        required: "Please enter a valid email address",
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg',
    },
    role: {
        type: String,
        default: 'user',
    },
    gender: {
        type: String,
        default: 'unknown',
    },
    mobile: {
        type: String,
        default: '',
    },
    addres: {
        type: String,
        default: '',
    },
    story: {
        type: String,
        default: '',
        maxLength: 200
    },
    website: {
        type: String,
        default: '',
    },
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    admin: {
        type: Boolean,
        default: false,
    },
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ]
}, {
    timestamps: true,
})

module.exports = mongoose.model('user', userSchema)