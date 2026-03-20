import { UserModel } from "../../models/user.model.js"
import jwt from 'jsonwebtoken'

const LogInUser = async (req, res) => {

    const { accessToken } = await req.body

    if (!accessToken) {
        return res.json({
            status: 400,
            success: false,
            massage: 'Access Token Required'
        })
    }

    try {

        const deCoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const userId = deCoded.id;
        const user = await UserModel.findById(userId).select('-password');

        return res.json({
            status: 200,
            success: true,
            data: user

        })

    } catch (error) {
        return res.json({
            status: 401,
            success: false,
            message: 'Invalid or Expired Token'
        });
    }
}

export { LogInUser }