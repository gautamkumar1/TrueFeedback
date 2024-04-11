import { resend } from "@/lib/resend";
import VerficationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";
import { url } from "inspector";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from:'onboarding@resend.dev',
            to: email,
            subject: 'MyStry Message | Verification Code',
            react: VerficationEmail({username,otp:verifyCode}),
        })
        return {
            success: true,
            message: "Verification email sent successfully"
        }
    } catch (emailError) {
        console.log("Error sending verification email ",emailError);
        return {
            success: false,
            message: "Failed to send verification email"
        }
        
    }
}