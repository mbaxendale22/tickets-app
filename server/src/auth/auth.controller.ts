import { Body, Controller, Post } from '@nestjs/common';
import { AuthSevice } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthSevice) {}

  //http route handlers e.g., auth/signup
  // the name of the route is passed to the decorator
  //
  // dto === data transform object. Just an object that contains data. Will be used with pipes for valiadation
  // pipes can also be used for data transformation
  @Post('signup')
  //@body decorator gives direct access to req.body in a framework agnostic way
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
