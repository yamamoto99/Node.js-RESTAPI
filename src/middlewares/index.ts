import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		// requestパラメータからIDを取得
		const { id } = req.params;
		// requestオブジェクトからloginユーザーIDを取得
		const currentUseId = get(req, "indentify._id") as string;

		// currentUserIdが存在しない場合は403を返す
		if (!currentUseId) {
			return res.sendStatus(403);
		}
		// リクエストパラメータのIDとcurrentUserIdが一致しない場合は403を返す
		if (id !== currentUseId.toString()) {
			return res.sendStatus(403);
		}
		next();
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		return res.sendStatus(400);
	}
};

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