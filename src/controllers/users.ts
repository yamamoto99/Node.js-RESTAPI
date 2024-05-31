import exprees from 'express';

import { getUsers, deleteUserById } from '../db/users';

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