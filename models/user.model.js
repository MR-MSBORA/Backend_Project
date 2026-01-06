/**
 * This code defines a User model using Mongoose for MongoDB.
 *
 * What it does:
 * 1. Defines a userSchema with fields like username, email, password, avatar, watchHistory, etc.
 *    - Sets validation rules (required, unique, lowercase, trim, indexes)
 *    - Stores references to other collections (watchHistory → Video)
 *    - Uses timestamps to automatically track creation and update times
 *
 * 2. Uses a pre-save middleware to hash passwords before saving.
 *    - Ensures passwords are stored securely
 *    - Only hashes if password is new or changed
 *
 * 3. Adds schema methods:
 *    - isPasswordCorrect(password): compares input password with hashed password
 *    - generateAccessToken(): creates a short-lived JWT access token containing user info
 *    - generateRefreshToken(): creates a long-lived JWT refresh token containing user ID
 *
 * 4. Exports the User model to interact with the 'users' collection in MongoDB
 *    - Allows creating, reading, updating, deleting users
 *    - Tokens generated via schema methods are used for authentication and session management
 *
 * Overall Flow:
 *  - When a new user is created, password is hashed automatically
 *  - On login, isPasswordCorrect() checks password validity
 *  - If valid, generateAccessToken() and generateRefreshToken() create JWTs for session
 *  - Access token is used for API authorization; refresh token is used to renew access tokens
 */

import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "USERNAME must be filled"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        id: {
            type: String,
            required

        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },
        avatar: {
            type: String, //cloudany url
            required: true,
        },
        coverimage: {
            type: String
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshTokan: {
            type: string
        },
        createdAt: {

        },
        updateAt: {

        }
    }, {
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    // This function runs automatically before a user document is saved

    // `this` refers to the current user document being saved
    // Checks whether the "password" field has been changed or newly added
    if (!this.isModified("password")) {
        // If the password was not changed, skip the rest of this function
        // and move on to saving the document
        return next();
    }
    // Takes the current password value
    // Converts it into a hashed (encrypted) version using bcrypt
    // 10 represents the number of hashing rounds
    this.password = bcrypt.hash(this.password, 10);
    // Signals that this middleware has finished running
    // and allows Mongoose to save the document
    next();
});


userSchema.methods.isPasswordCorrect = async function (password) {
    // Adds a method to the user model

    // Receives a password value as input
    // Accesses the stored hashed password from the current user document

    // Compares the input password with the stored hashed password
    // Returns true if they match, otherwise false
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    // Generates a JWT access token for the current user
    // Why we use this:
    // 1. Encapsulates token creation in the user model (clean & reusable)
    // 2. Includes essential user info (_id, email, username, fullname) 
    //    so backend can authenticate the user without extra DB queries
    // 3. Short-lived token (expires in ACCESS_TOKEN_EXPIRY) for security
    // 4. Centralizes token logic — easy to update if structure or expiry changes
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    // Generates a JWT refresh token for the current user
    // Why we use this:
    // 1. Long-lived token that allows the user to stay logged in longer
    // 2. Minimal payload (_id only) to reduce exposure if stolen
    // 3. Can be used to generate new access tokens when they expire
    // 4. Keeps access tokens short-lived for security, while maintaining session
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};



export const User = mongoose.model("User", userSchema)