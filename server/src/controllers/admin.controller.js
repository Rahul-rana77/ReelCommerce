import adminModel from "../models/admin.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerAdmin = async (req, res) => {
    try {
        const { businessName, email, password,confirm, phone, contactName, address } = req.body;
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        if(password !== confirm) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const Admin = await adminModel.create({
            businessName,
            email,
            password: hashedPassword,
            confirm: hashedPassword,
            phone,
            contactName,
            address
        });

        const adminToken = jwt.sign({
             id: Admin._id, 
            }, process.env.JWT_SECRET);
        res.cookie("token", adminToken);

        res.status(201).json({ 
            message: "Admin registered successfully", 
            admin: {
                _id: Admin._id,
                businessName: Admin.businessName,
                email: Admin.email,
                businessType: Admin.businessType
            },
         });
    } catch (error) {
        console.error("Error in registerAdmin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({
            id: admin._id,
        }, process.env.JWT_SECRET);
        res.cookie("token", token);

        res.status(200).json({
            message: "Admin logged in successfully",
            admin: {
                _id: admin._id,
                businessName: admin.businessName,
                email: admin.email,
                businessType: admin.businessType
            },
        });
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutAdmin = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};

export { registerAdmin, loginAdmin, logoutAdmin };