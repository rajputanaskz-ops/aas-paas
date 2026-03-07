import { UserModel } from "../../models/user.model.js"

const forgotPassword = async (req, res) => {
    try {

        const { phoneNo } = req.body;

        if (!phoneNo) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            });
        }

        const doesUserExistWithPhoneNo = await UserModel.findOne({ phoneNo: phoneNo });

        if (!doesUserExistWithPhoneNo) {
            return res.status(404).json({
                success: false,
                message: "Phone number is not found"
            });
        }

        const forgotPasswordOtp = Math.floor(100000 + Math.random() * 900000);
        console.log('forgotPasswordOtp',forgotPasswordOtp);
        
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }
}

export { forgotPassword }
