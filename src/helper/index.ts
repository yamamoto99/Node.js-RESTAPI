import crypto from 'crypto';

// 秘密鍵
const SECRET = 'YAMAMOTO-REST-APT-SECRET-KEY';

// ランダムな文字列を生成
export const random = () => crypto.randomBytes(128).toString('base64');
// saltとパスワードを使用してHMACを生成
// HMAC: https://ja.wikipedia.org/wiki/HMAC
export const authentication = (salt: string, password: string) => {
	return crypto.createHmac('sha256',[salt, password].join('/')).update(SECRET).digest('hex');
};