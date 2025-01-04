// here we are using mongoose library of nodejs and mongodb
import mongoose, {Schema,Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}
// message schema ek custome schme a follow krega named as Message
const MessageSchema: Schema<Message> = new Schema ({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    isVerified:boolean;
    messages:Message[]

}

const UserSchema: Schema<User> = new Schema ({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique:true,
        //to test valid email, regex to check valid email
        match:[/.+\@.+\..+/, 'please use a valid email address']
    },
    verifyCode:{
        type: String,
        required: [true,"Verify code is required"]
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true,"Verify code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
    //The MessageSchema is embedded in the UserSchema, allowing a user to store an array of messages.
})
// if we run a code to nodejs ko nhi patat ho ksta h apna svhema baaar baar run ho so for that
//The UserModel can be reused across the backend for querying and updates.
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel
//In TypeScript, string is lowercase (string), but in Mongoose, String is uppercase (String).

//export is just to use this interface out of this file also it does not relate with backened
//In Mongoose (used with MongoDB), a Schema defines the structure of the data in the database, It enforces data validation, field types, and constraints at the database level. basically schema is for backened and cihldren is for frontend, second document - Mongoose document methods and properties use this version if you are defining a message object outside the context of Mongoose, or if you plan to handle the data purely in TypeScript without Mongoose's database capabilities
//we are using MongoDB ki library
// jaise interface declare kiya tha jab only tsx kar rhe the bus waha usko database me bhej nhi rhe the isliye we didnot use export but yaha backened bhi chlega therefore export

//Without a schema, you may end up with inconsistent data types and missing fields, making it harder to manage and query your database effectively.
//Using Mongoose schemas (if using MongoDB) or ORM (Object-Relational Mapping) libraries like Sequelize (for PostgreSQL) helps manage the data layer effectively
//schema - defines structure of documents , , enforces rules on data like string honi chahiyen,allows you to utilize Mongoose's built-in methods for querying, updating, and managing documents. 
//typescript me string small s scema me capital S
//jaise apna ne message ka schema bnaya wais ehi user ka schema, similarly fir uska schema bnayenge
//match ke andar - regex(used for type validation ki email h ya nhi phone numnber h ya nhi), ohterwise error bhi show kar skte please enter valid email adress
