import { Http2ServerRequest } from 'http2';
import jwt from 'jsonwebtoken';
import { IUser, User } from 'src/models/User';

export class AuthService {
  public passwordsMatch(user: IUser, password: string) {
    return new Promise(async (resolve, reject) => {
      // @ts-ignore
      const matches = user.matchPassword(password);
      if (matches) return resolve(true);
      return reject(new Error('Incorrect authentication details.'));
    });
  }

  public authenticate(req: any, user: IUser): void {
    const { email, firstName, lastName } = user;
    const token = jwt.sign({ email, firstName, lastName }, 'secret', {
      expiresIn: '12h',
    });
    req.res.cookie('token', token, {
      signed: true,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 0.5), // 12 hours
    });
  }
}
