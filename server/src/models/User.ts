import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  matchPassword: (password: string) => Promise<boolean>;
  save: () => Promise<IUser>;
}
export interface ISerializedUser {
  email: string;
  name: string;
  surname: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (reqPassword: string) {
  return await bcrypt.compare(reqPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const currentPassword: string | undefined = this.password;
  if (!currentPassword) throw new Error('Password is undefined');
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(currentPassword, salt);
  this.password = hashedPassword;
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
