import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper function to create JWT token
const createToken = (id) => {
    const secret = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET || "default_jwt_secret";
    return jwt.sign({ id }, secret, {
        expiresIn: 3 * 24 * 60 * 60
    });
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        };
        res.status(200).json({ user: userResponse, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        if (validator.isEmpty(name.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter a strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol)" });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        };
        res.status(200).json({ user: userResponse, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Info
const getUser = async (req, res) => {
    const id = req.user.id;
    try {
        const user = await userModel.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { loginUser, registerUser, getUser };
