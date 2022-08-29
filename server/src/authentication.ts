import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function expressAuthentication(
  request: express.Request,
  securityName?: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'jwt') {
    const token =
      request.signedCookies['token'].replace(/^Bearer /, '') ||
      (request.headers.authorization || '').replace(/^Bearer /, '');
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(token, 'secret', function (err: any, user: any) {
        if (err) {
          reject(err);
        } else {
          if (scopes) {
            for (let scope of scopes) {
              if (!user.scopes.includes(scope)) {
                reject(new Error('JWT does not contain required scope.'));
              }
            }
          }
          resolve(user);
        }
      });
    });
  }
  return Promise.reject('Bad boy...');
}
