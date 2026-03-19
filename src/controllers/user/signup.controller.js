import { UserModel } from "../../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SignUpUser = async (req, res) => {

    try {
        const { phoneNo, username, password, confirmPassword } = await req.body


        let fields = [phoneNo, username, password, confirmPassword];
        
        for (const field of fields) {
            if (!field) return res.json({
                status: 400,
                success: false,
                message: `All fields are required`
            })
        }

            if (phoneNo.length > 12) {
            return res.status(400).json({
                success: false,
                message: "Phone number cannot be more than 11 digits"
            })
            }

            if (!/^[0-9]+$/.test(phoneNo)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must contain only digits"
            })
            }

        const doesUserExist = await UserModel.findOne({ phoneNo})

        if (doesUserExist) return res.json({
            status: 409,
            success: false,
            message: `Phone No already exists`
        })

        if (password != confirmPassword) return res.json({
            status: 400,
            success: false,
            message: `Passwords do not match`
        })

        const hashedPassword = await bcrypt.hash(password,10)

        const createdUser = await UserModel.create({
            phoneNo: phoneNo,
            username,
            password: hashedPassword
        })

        const accessToken  = jwt.sign(
            {
            id: createdUser._id
            },
             process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        )
        const refreshToken  = jwt.sign(
            {
            id: createdUser._id
            },
             process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        )

        return res.json({
            status: 201,
            success: true,
            message: `User has been created`,
            accessToken: accessToken,
            refreshToken: refreshToken
        })

    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            success: false,
            message: `User not created`
        })
    }

}

export { SignUpUser }