const mongoose = require("mongoose");
const validator = require("validator");
const { hash, matchPassword } = require("../utils/passHandler");
const jwt = require("jsonwebtoken");
const Task = require("./project");
const authToken = process.env.AUTH_TOKEN;

const userSchema = new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 25, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw { message: "Invalid email" };
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(password) {
            if (!validator.isStrongPassword(password)) {
                throw { message: "Invalid password" };
            }
        },
    },
    age: {
        type: Number,
        default: 10,
        validate(value) {
            if (value <= 0 || value > 120) {
                throw new Error("Invalid age!");
            }
        },
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (value.toString().length != 10) {
                throw { message: "Invalid phone number!" };
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    },],
    avatar: {
        uploadedAt: {
            type: Date,
        },
        name: { type: String },
        img: {
            data: Buffer,
            contentType: String,
        },
    },
}, { timestamps: true });
//COnnecting Task with Users
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});

//Creating custom functions

//Removing critical information while sending the object
userSchema.methods.toJSON = function () {
    const userObj = this.toObject();
    delete userObj.password;
    delete userObj.tokens;
    delete userObj.avatar;
    return userObj;
};

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, authToken, {
        expiresIn: "7 days",
    });
    this.tokens = this.tokens.concat({ token });

    await this.save();
    return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials!");
    }
    const isMatch = await matchPassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials!");
    }
    return user;
};

//Hashing the password
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await hash(this.password);
        }
    } catch (err) {
        throw new Error(`Unable to hash password  ${err}`);
    }
    next();
});

//Deleting the tasks associated with the user
userSchema.pre("remove", async function (next) {
    try {
        await Task.deleteMany({ owner: this._id });
    } catch (err) {
        throw new Error(`Unable to remove the tasks from your profile`);
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;