import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

// Expressアプリケーションの作成
const app = express();

// CORSの設定
app.use(cors({
	credentials: true,
}))

// ミドルウェアの設定
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// HTTPサーバーの作成
const server = http.createServer(app);

// サーバーの起動
server.listen(8000, () => {
	console.log('Server is running on http://localhost:8000/');
});

// MongoDBの設定
const MONGO_URL = "mongodb+srv://yamamoto99:Dd0Nl2Gl62mCrmap@cluster0.as5rwdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Promiseの設定
mongoose.Promise = Promise;
// 設定されたURLでMongoDBに接続
mongoose.connect(MONGO_URL);
// 'error'イベントが発生した場合Error型のerrorを受け取り、コンソールに出力
mongoose.connection.on('error', (error: Error) => console.log(error));

// ルーターの設定
app.use('/', router());