import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: {type: String, require: true},
  email: {type: String, require: true},
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false}
  }
})

export const UserModel = mongoose.model('User', UserSchema)
export const getUsers = () => UserModel.find()
export const getUsersByEmail = (email: String) => UserModel.findOne({email})
export const getUsersBySessionToken = (sessionToken: String) => UserModel.findOne({ 'authentication.sessionToken': sessionToken 
})
export const getUsersById = (id: String) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: String) => UserModel.findOneAndDelete({_id: id})
export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate( id, values )