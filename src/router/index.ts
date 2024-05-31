import express from "express";

import authentication from "./authentication";
import users from "./users";

// ルーターの作成
const router = express.Router();

// エンドポイントの設定
export default (): express.Router => {
	authentication(router);
	users(router);
	return router;
};
