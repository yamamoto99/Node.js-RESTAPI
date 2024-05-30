import express from "express";

import {getUserByEmail, createUser} from "../db/users";
import {authentication, random} from "../helper";

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const {email, password} = req.body;

		// メールアドレスとパスワードが存在しない場合は400を返す
		if (!email || !password) {
			return res.sendStatus(400);
		}

		// メールアドレスを使用してユーザーを検索
		const user = await getUserByEmail(email).select("+authentication.salt +authentication.password +username +email");
		if (!user) {
			// ユーザーが存在しない場合は400を返す
			return res.sendStatus(400);
		}

		// パスワードとsaltを使用してHMACを生成するauthentication関数を使用
		const expectedHash = authentication(user.authentication.salt, password);
		if (user.authentication.password !== expectedHash) {
			// パスワードが一致しない場合は403を返す
			return res.sendStatus(403);
		}

		// saltを生成
		const salt = random();
		// saltとユーザーIDを使用してセッショントークンを生成
		user.authentication.sessionToken = authentication(salt, user._id.toString());

		// userドキュメント更新
		await user.save();

		// クッキーにセッショントークンを設定
		res.cookie("REST_AUTHENTICATION", user.authentication.sessionToken, { domain: "localhost", path: "/"});

		// 200OKとユーザー情報を返す
		return res.status(200).json(user).end();
	} catch (error) {
		// エラーが発生した場合は400を返す
		console.error(error);
		return res.sendStatus(400);
	}
};

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