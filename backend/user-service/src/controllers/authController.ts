import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from "../util/auth.js";

export async function login(req: Request, res: Response) {
  // -- Parser component
  const { username, password } = req.body;
  try {
    if (!username || !password) {
        throw Error("username or password cannot be empty")
    }
    // ----

    const user = await User.findOne({ username });

    if (!user) {
        throw Error("Invalid username");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Invalid Password");
    }

    const token = createToken(user._id);
    res.status(200).json({user_id: user._id, token});
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  // salt and hash password
  try {
    if (!username || !email || !password) {
      throw Error("Username, Email or password cannot be empty")
    }
    /*
    if (!validator.isEmail(email)) {
        throw Error("Invalid Email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password must contain uppercase, lowercase, number and special character")
    }
    */
    const existsEmail = await User.findOne({ email });
    const existsUsername = await User.findOne({ username });
    if (existsEmail) {
        throw Error('Email already in use');
    } 

    if (existsUsername) {
        throw Error('Username already in use');
    } 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hash });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }

}