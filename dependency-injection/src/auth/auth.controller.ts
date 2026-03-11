import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get(':userid')
  public login(
    @Param('userid', ParseIntPipe) userid: number,
  ): object | undefined {
    return this.authService.login(userid);
  }
}
