import { NextFunction } from 'express';
import { app } from 'src/app';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Query,
  Route,
  Security,
  SuccessResponse,
  Request,
  Tags,
} from 'tsoa';
import { ISerializedUser, IUser, User } from '../models/User';
import type { UserCreationParams } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

const userService = new UserService();
const authService = new AuthService();

@Tags('User')
@Route('user')
export class UsersController extends Controller {
  @Post('/')
  @SuccessResponse(200, 'OK')
  public async signUp(
    @Request() req: Express.Request,
    @Body() body: UserCreationParams
  ): Promise<ISerializedUser> {
    const user: IUser = await userService.create(body);
    authService.authenticate(req, user);

    return userService.serialize(user);
  }

  @Post('/login')
  @SuccessResponse(200, 'OK')
  public async login(
    @Request() req: Express.Request,
    @Body() body: { email: string; password: string }
  ): Promise<ISerializedUser> {
    const { email, password } = body;
    console.log(body);
    const user = await userService.getByEmail(email);
    await authService.passwordsMatch(user, password);
    authService.authenticate(req, user);
    return userService.serialize(user);
  }
}
