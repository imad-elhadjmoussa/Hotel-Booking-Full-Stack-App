import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// 1. Interface for TypeScript typing
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// 2. Mongoose Schema
const UserSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Hash password before saving
    }
    next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};


// 3. Model export (prevent model overwrite in dev)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
