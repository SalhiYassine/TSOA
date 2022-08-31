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
  Response,
} from 'tsoa';
import { UserService } from '../services/UserService';

const userService = new UserService();

@Tags('User')
@Route('user')
export class UsersController extends Controller {
  @Post('/')
  @SuccessResponse(200, 'OK')
  @Response(400, 'Could not be registered!')
  public async signUp(@Request() req: Express.Request) {
    return await userService.signUp(req);
  }

  @Post('/login')
  @SuccessResponse(200, 'OK')
  @Response(403, 'Could not be authenticated!')
  public async login(@Request() req: Express.Request) {
    return await userService.login(req);
  }
}
