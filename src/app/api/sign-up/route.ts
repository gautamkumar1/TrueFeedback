import dbConnect from "@/lib/db-Connection";
import UserModel from "@/models/user-model";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()
    try {
        const { username, email,password} = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({ username,
            isVerfied:true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username is already taken"
            },{
                status: 400
            })
        }
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        const existingUserByEmail = await UserModel.findOne({email})
        if(existingUserByEmail){
            if(existingUserByEmail.isVerfied){
                return Response.json({
                    success: false,
                    message: "Email is already in use"
                },{
                    status: 400
                })
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10);
                existingUserByEmail.password = hashedPassword,
                existingUserByEmail.verifyCode = verifyCode,
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000),
                await existingUserByEmail.save()
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const exipryDate = new Date()
            exipryDate.setHours(exipryDate.getHours() + 1)
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: exipryDate,
                isVerfied: false,
                isAccpetingMessage:true,
                messages: []
            })
            // Saved user
            await newUser.save()
            

        }
        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse){
            return Response.json({
                success: false,
                message: existingUserByEmail?.messages
            },{
                status: 400
            })
        }
        return Response.json({
            success: true,
            message:"User Registered successfully. Please verify your email"
        },{status: 200})

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