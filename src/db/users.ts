import mongoose from "mongoose";

// ユーザースキーマの定義
const UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, required: true},
	authentication: {
		password: {type: String, required: true, select: false},
		salt: {type: String, select: false},
		sessionToken: {type: String, select: false},
	},
});

// モデル定義
export const UserModel = mongoose.model('User', UserSchema);

// 全ユーザーの取得
export const getUsers = () => UserModel.find();
// メールアドレスからユーザーの取得
export const getUserByEmail = (email: string) => UserModel.findOne({email});
// セッショントークンからユーザーの取得
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
	'authentication.sessionToken': sessionToken
});
// IDからユーザーの取得
export const getUserById = (id: string) => UserModel.findById(id);
// ユーザーの作成
export const createUser = (values: Record<string, any>) => new UserModel(values)
	.save().then((user) => user.toObject());
// IDからユーザーの削除
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
// IDからユーザーの更新
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);