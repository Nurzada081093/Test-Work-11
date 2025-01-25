import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";
import {UserData} from "../types";

interface UserMethods {
    checkUserPassword(password: string): Promise<boolean>;
    generateUserToken(): void;
}

type UserModel = Model<UserData, {}, UserMethods>;

const Schema = mongoose.Schema;

const  HASHING_PASSWORD = 10;

const UserSchema = new Schema<HydratedDocument<UserData>, UserModel, UserMethods>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        validate: {
            validator: async function (this:HydratedDocument<UserData> , value: string): Promise<boolean> {
                if (!this.isModified('username')) return true;
                const user: UserData | null = await User.findOne({username: value});
                return !user;
            },
            message: 'This username is already in taken!',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        required: [true, 'Token is required'],
    },
    displayName: {
        type: String,
        required: [true, 'Token is required'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: async function (this:HydratedDocument<UserData> , value: string): Promise<boolean> {
                if (!this.isModified('phoneNumber')) return true;
                const user: UserData | null = await User.findOne({phoneNumber: value});
                return !user;
            },
            message: 'This phone number is already in taken!',
        },
    }
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const hashingPassword = await bcrypt.genSalt(HASHING_PASSWORD);
    this.password = await bcrypt.hash(this.password, hashingPassword);
    next();
});

UserSchema.methods.checkUserPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateUserToken = function () {
    this.token = randomUUID();
};

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;