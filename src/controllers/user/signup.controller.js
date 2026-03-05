import { UserModel } from "../../models/user.model.js"
import bcrypt from 'bcrypt'

const SignUpUser = async (req, res) => {

    try {
        const { phoneNo, username, password, confirmPassword } = await req.body

        let fields = [phoneNo, username, password, confirmPassword]
        for (const field of fields) {
            if (!field) return res.json({
                status: 400,
                success: false,
                message: `All fields are required`
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
        console.log(1)

        const hashedPassword = await bcrypt.hash(password,10)
        console.log(1)

        const createdUser = await UserModel.create({
            phoneNo: phoneNo,
            username,
            password: hashedPassword
        })
        console.log(1)

        return res.json({
            status: 200,
            success: true,
            message: `User has been created`
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