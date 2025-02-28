import { Router } from "express";
import * as z from "zod";
import { AccountsModel, UserModel } from "./db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { userMiddleware } from "./middlewares/userMiddleware";
import { ObjectId } from "mongoose";

const userInputSchema = z.object({
  firstname: z.string({ required_error: "First name must be provided" }),
  lastname: z.string({ required_error: "Last name must be provided" }),
  email: z
    .string({ required_error: "Email must be provided" })
    .email({ message: "Invalid Email Format" }),
  username: z
    .string({ required_error: "Username must be provided" })
    .min(3, { message: "Username must be 3 letters or more" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  password: z
    .string({ required_error: "Password must be provided" })
    .min(8, { message: "Password must be 8 letters or characters" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[\d\W])[a-zA-Z\d\W]{8,}$/, {
      message:
        "Password must include 8+ chars, at least 1 letter, 1 special char or number",
    }),
});

export const Signup = Router().post("/signup", async (req, res) => {
  const { error } = userInputSchema.safeParse(req.body);

  if (error) {
    res.status(411).json({
      error: error.format(),
    });
    return;
  }

  const { firstname, lastname, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const alreadyExists = await UserModel.findOne({
    email,
    username,
  });

  if (alreadyExists) {
    res.status(403).json({
      error: "User with this email or username already exists",
    });
    return;
  }

  try {
    const user = await UserModel.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await AccountsModel.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000
    })

    res.json({
      message: "User Signed Up",
    });
  } catch (_) {
    res.status(500).json({
      error: "Error occured while signing up",
    });
  }
});

const userSigninSchema = userInputSchema.omit({
  email: true,
  firstname: true,
  lastname: true,
});

export const Signin = Router().post("/signin", async (req, res) => {
  const { error } = userSigninSchema.safeParse(req.body);

  if (error) {
    res.status(411).json({
      error: error.format(),
    });
    return;
  }

  const { username, password } = req.body;

  const userExists = await UserModel.findOne({
    username,
  });

  if (!userExists) {
    res.status(403).json({
      message: "Use Doesn't exists",
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, userExists.password);

  if (isMatch) {
    const token = jwt.sign(
      {
        id: userExists._id,
      },
      process.env.JWT_SECRET as jwt.Secret
    );

    res.status(200).json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

const updateUserInputSchema = userInputSchema.omit({
  email: true,
  username: true,
});

export const Update = Router().put(
  "/update",
  userMiddleware,
  async (req, res) => {
    const { error } = updateUserInputSchema.safeParse(req.body);

    if (error) {
      res.status(404).json({
        error: error.format(),
      });
      return;
    }

    const { id } = req.body;

    const userExists = await UserModel.findOne({
      _id: id,
    });

    if (!userExists) {
      res.status(411).json({
        message: "User Doesn't Exists",
      });
      return;
    }

    const { firstname, lastname, password } = req.body;

    try {
      await userExists.updateOne({
        firstname,
        lastname,
        password,
      });

      res.json({
        message: "User updated",
      });
    } catch (_) {
      res.status(500).json({
        message: "Error occured while updating user",
      });
    }
  }
);

export const Bulk = Router().post("/users/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await UserModel.find({
      $or: [
        {
          firstname: {
            $regex: filter,
          },
        },
        {
          lastname: {
            $regex: filter,
          },
        },
        {
          username: {
            $regex: filter,
          },
        },
      ],
    });

    if (!users) {
      res.json({
        message: "No similar users",
      });
      return;
    }

    res.json(
      users.map(
        (user: {
          firstname: string;
          lastname: string;
          username: string;
          _id: ObjectId;
        }) => {
          return {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            _id: user._id,
          };
        }
      )
    );
  } catch (_) {
    res.status(500).json({
      message: "Error occured while fetching users",
    });
  }
});

export const AccountRouter = Router().post("/account", async (req, res)=> {
  
})