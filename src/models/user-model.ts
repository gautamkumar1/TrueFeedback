import mongoose, { Schema, Document, Model } from "mongoose";
/*---------------------------
Messages Interface
---------------------------
*/

interface Message extends Document {
    content: string;
    createdAt: Date;
}
/*---------------------------
Messages Schema
---------------------------
*/
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: "String",
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

/*---------------------------
User Interface
---------------------------
*/

interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerfied: boolean;
    isAccpetingMessage: boolean;
    messages: Message[];
}

/*---------------------------
User Schema
---------------------------
*/

const UserSchema: Schema<User> = new Schema({
    username: {
        type: "String",
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email:{
        type: "String",
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm, "Please use a valid email address"]
    },
    password:{
        type: "String",
        required: [true, "Password is required"],
    },
    verifyCode:{
        type: "String",
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry:{
        type: "Date",
        required: [true, "Verify Code Expiry is required"],
    },
    isVerfied:{
        type: "Boolean",
        default: false
    },
    isAccpetingMessage:{
        type: "Boolean",
        default: true
    },
    messages: [MessageSchema]
})

/*---------------------------
Exports all models
---------------------------
*/
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel;