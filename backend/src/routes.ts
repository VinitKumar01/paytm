import {Router} from 'express';
import * as z from "zod";
import { UserModel } from './db';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const userInputSchema = z.object({
    firstname: z.string({required_error: "First name must be provided"}),
    lastname: z.string({required_error: "Last name must be provided"}),
    email: z.string({required_error: "Email must be provided"}).email({message: "Invalid Email Format"}),
    username: z.string({required_error: "Username must be provided"}).min(3, {message: "Username must be 3 letters or more"}).max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    password: z.string({required_error: "Password must be provided"}).min(8, {message: "Password must be 8 letters or characters"}).regex(/^(?=.*[a-zA-Z])(?=.*[\d\W])[a-zA-Z\d\W]{8,}$/, 
        { message: "Password must include 8+ chars, at least 1 letter, 1 special char or number" })
})

export const Signup = Router().post("/signup", async (req, res)=> {
    const {error} = userInputSchema.safeParse(req.body);
    
    if (error) {
        res.status(411).json({
            error: error.format()
        })
        return;
    }

    const {firstname, lastname, username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const alreadyExists = await UserModel.findOne({
        email,
        username
    })

    if (alreadyExists) {
        res.status(403).json({
            error: "User with this email or username already exists"
        })
        return;
    }

    try {
        await UserModel.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        })
        res.json({
            message: "User Signed Up"
        })
    } catch(_){
        res.status(500).json({
            error: "Error occured while signing up"
        })
    }

})

const userSigninSchema = userInputSchema.omit({email: true, firstname: true, lastname: true})

export const Signin = Router().post("/signin", async (req, res)=> {
    const {error} = userSigninSchema.safeParse(req.body);

    if (error) {
        res.status(411).json({
            error: error.format()
        })
        return;
    }

    const {username, password} = req.body;

    const userExists = UserModel.findOne({
        username
    })

    if (!userExists) {
        res.status(403).json({
            message: "Use Doesn't exists"
        })
        return;
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (isMatch) {
        const token = jwt.sign({
            id: userExists._id,
        }, process.env.JWT_SECRET as jwt.Secret);

        res.status(200).json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

export const Update = Router().put("/update", (req, res)=> {
    res.json({
        message: "Hello form update"
    })
})