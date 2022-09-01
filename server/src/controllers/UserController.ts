import { UserService } from '../domains/User/UserService';
import {
  Controller,
  Post,
  Route,
  SuccessResponse,
  Request,
  Tags,
  Response,
} from 'tsoa';
import UserRepoMongo from '../domains/User/UserRepoMongo';
import { User } from '../models/User';

// @ts-ignore
const userRepo = new UserRepoMongo(User);
const { authenticateUser, registerOneUser } = UserService(userRepo);

@Tags('User')
@Route('user')
export class UsersController extends Controller {
  @Post('/')
  @SuccessResponse(200, 'OK')
  @Response(400, 'Could not be registered!')
  public signUp(@Request() req: any) {
    const { firstName, lastName, email, password } = req.body;
    return registerOneUser({
      firstName,
      lastName,
      email,
      password,
    });
  }

  @Post('/login')
  @SuccessResponse(200, 'OK')
  @Response(403, 'Could not be authenticated!')
  public async login(@Request() req: any) {
    return await authenticateUser(req.body.email, req.body.password);
  }
}
