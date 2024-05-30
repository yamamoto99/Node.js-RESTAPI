import express from "express";

import {getUserByEmail, createUser} from "../db/users";
import {authentication, random} from "../helper";

export const register = async (req: express.Request, res: express.Response) => {
	try{
		// リクエストボディからユーザー名、メールアドレス、パスワードを取得
		const {username, email, password} = req.body;

		// ユーザー名、メールアドレス、パスワードが存在しない場合は400を返す
		if (!email || !password || !username) {
			return res.sendStatus(400);
		}

		// メールアドレスを検索
		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			// 既に存在する場合は400を返す
			return res.sendStatus(400);
		}

		// saltを生成
		const salt = random();
		// ユーザーを作成
		const user = await createUser({
			username,
			email,
			authentication: {
				salt,
				// パスワードとsaltを使用してHMACを生成するauthentication関数を使用
				password: authentication(salt, password),
			},
		});
		return res.status(200).json(user).end;
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		return res.sendStatus(400);
	}
}