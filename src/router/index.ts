import express from "express";

import authentication from "./authentication";

// ルーターの作成
const router = express.Router();

// エンドポイントの設定
export default (): express.Router => {
	authentication(router);
	return router;
};
