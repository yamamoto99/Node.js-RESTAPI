import exprees from 'express';

import { getUsers } from '../db/users';

export const getAllUsers = async (req: exprees.Request, res: exprees.Response) => {
	try {
		const users = await getUsers();
		return res.status(200).json(users);
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		res.sendStatus(400);
	}
};