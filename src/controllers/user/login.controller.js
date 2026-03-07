import { UserModel } from "../../models/user.model.js"
import bcrypt from "bcryptjs";

const LoginUser = async (req, res) => {
    try {
        const { phoneNoOrUsername, password } = req.body;


        if (!phoneNoOrUsername || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }



        const user = await UserModel.findOne({
            $or: [
                { username: phoneNoOrUsername },
                { phoneNo: phoneNoOrUsername }
            ]
        });
            if (!user) {
            const isPhone = /^\d+$/.test(phoneNoOrUsername);
            return res.status(400).json({
                success: false,
                message: isPhone ? 'Phone number not found' : 'Username not found'
            });
            }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',

        });
    } catch (error) {
        
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

export { LoginUser }