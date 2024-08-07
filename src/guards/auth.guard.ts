import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    //@Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    //@Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    //console.log(authorization);

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      request.user = await this.userService.show(data.id);
      console.log(request.user);

      return true;
    } catch (e) {
      //console.log('não');
      return false;
    }
  }
}
