const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('express')

const authControll = {
    register: async (req, res) => {
        try {
            const { fullname, userName, email, password, gender, admin } = req.body
            let newUserName = userName.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({ userName: newUserName })
            if (user_name)
                return res.status(400).json({ msg: "This username already exists" })

            const user_email = await Users.findOne({ email })
            if (user_email)
                return res.status(400).json({ msg: "This email already exists" })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)


            const newUser = new Users({
                fullname, userName: newUserName, email, password: passwordHash, gender, admin
            })

            const access_token = createAccessToken({ id: newUser._id })
            const refresh_token = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000
            })

            await newUser.save()

            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ mg: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email: email })
                .populate("followers following", "-password")
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const access_token = createAccessToken({ id: user._id })
            const refresh_token = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000
            })

            res.json({
                msg: 'Login success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ mg: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.json({ mg: 'Logged out!' })
        } catch (err) {
            return res.status(500).json({ mg: err.message });
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ mg: "Please loggin now!" });
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ mg: "Please loggin now!" })

                const user = await Users.findById(result.id).select("-password")
                    .populate('followers following', '-password')

                if (!user) return res.status(404).json({ mg: "This does not exist" })

                const access_token = createAccessToken({ id: result.id })

                response.json({
                    access_token,
                    user
                })
            })
            res.json({ rf_token })
        } catch (err) {
            return res.status(500).json({ mg: err.message });
        }
    },

}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}

module.exports = authControll