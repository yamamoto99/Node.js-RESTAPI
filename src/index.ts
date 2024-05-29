import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

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
