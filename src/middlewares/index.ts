import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const sessionToken = req.cookies["REST_AUTHENTICATION"];
		// セッショントークンが存在しない場合は403を返す
		if (!sessionToken) {
			return res.sendStatus(403);
		}

		const existingUser = await getUserBySessionToken(sessionToken);
		// ユーザーが存在しない場合は403を返す
		if (!existingUser) {
			return res.sendStatus(403);
		}

		// リクエストオブジェクトにユーザー情報を追加
		merge(req, {indentify: existingUser});

		return next();
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		return res.sendStatus(400);
	}
}