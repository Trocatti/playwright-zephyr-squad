import jwt from 'jsonwebtoken';
import crypto from 'crypto';

type GenerateTokenOptions = {
  accountId: string;
  accessKey: string;
  secrectKey: string;
  httpMethod: string;
  relativePath: string;
  queryString?: string;
};

export class GenerateToken {
  private readonly accountId: string;
  private readonly accessKey: string;
  private readonly secrectKey: string;
  private readonly httpMethod: string;
  private readonly relativePath: string;
  private readonly queryString: string;

  constructor(options: GenerateTokenOptions) {
    this.accessKey = options.accessKey;
    this.accountId = options.accountId;
    this.secrectKey = options.secrectKey;
    this.httpMethod = options.httpMethod;
    this.relativePath = options.relativePath;
    this.queryString = options?.queryString ?? '';
  }

  getCanonicalPath() {
    const basePath = `${this.httpMethod}&${this.relativePath}&`;
    return this.queryString ? `${basePath}${this.queryString}` : basePath;
  }

  generate(jwtExpire = 3600) {
    const payloadToken = {
      sub: this.accountId,
      qsh: crypto.createHash('sha256').update(this.getCanonicalPath()).digest('hex'),
      iss: this.accessKey,
      exp: Math.floor(Date.now() / 1000) + jwtExpire,
      iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payloadToken, this.secrectKey, { algorithm: 'HS256' });
  }
}
