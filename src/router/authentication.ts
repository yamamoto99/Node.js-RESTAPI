import express from 'express';

import { register } from '../controllers/authentication';
import { login } from '../controllers/authentication';

export default (router: express.Router) => {
	// /auth/registerにPOSTリクエストがあった場合register関数を実行
	router.post('/auth/register', register);
	router.post('/auth/login', login);
};