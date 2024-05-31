import exprees from 'express';

import { getUsers, deleteUserById, getUserById } from '../db/users';

export const getAllUsers = async (req: exprees.Request, res: exprees.Response) => {
	try {
		// 全ユーザー情報を取得
		const users = await getUsers();
		return res.status(200).json(users);
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		res.sendStatus(400);
	}
};

export const deleteUser = async (req: exprees.Request, res: exprees.Response) => {
	try {
		// リクエストパラメータからユーザーIDを取得
		const { id } = req.params;
		// IDからユーザーを削除
		const deletedUser = await deleteUserById(id);
		// 削除されたユーザー情報を返す
		return res.json(deletedUser);
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		res.sendStatus(400);
	}
}

export const updateUser = async (req: exprees.Request, res: exprees.Response) => {
	try {
		// リクエストパラメータからユーザーIDを取得
		const { id } = req.params;
		// リクエストボディからユーザー名を取得
		const { username } = req.body;
		// ユーザー名が存在しない場合は400を返す
		if (!username) {
			return res.sendStatus(400);
		}
		// IDからユーザーを取得
		const user = await getUserById(id);
		// ユーザー名を更新
		user.username = username;
		await user.save();

		return res.status(200).json(user).end();
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		res.sendStatus(400);
	}
};