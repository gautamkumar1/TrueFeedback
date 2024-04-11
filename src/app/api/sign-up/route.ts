import dbConnect from "@/lib/db-Connection";
import UserModel from "@/models/user-model";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()
    try {
        const { username, email,password} = await request.json();
    } catch (error) {
        console.log("Error Registering" , error);
        return Response.json({
            success: false,
            message: "Error Registering"
        },
        {
            status: 500
        }
              )
        
    }
}