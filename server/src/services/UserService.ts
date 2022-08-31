import { checkUserCredentials } from '../cases/checkUserCredentials';
import { serializeUser } from '../cases/serializeUser';
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { createUser } from '../cases/createUser';
import { UserCreationParams } from 'src/repository/userRepository';
export class UserService {
  public async login(httpRequest: any) {
    const { body } = httpRequest;
    const { email, password } = body;
    const user = await checkUserCredentials(email, password);
    this.authenticate(httpRequest, user);
    return serializeUser(user);
  }
  public async signUp(httpRequest: any) {
    const { body } = httpRequest;
    const { email, password, firstName, lastName } = body;
    const user = await createUser({
      email,
      firstName,
      lastName,
      password,
    } as UserCreationParams);
    this.authenticate(httpRequest, user);
    return serializeUser(user);
  }

  private authenticate(req: any, user: IUser): void {
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
