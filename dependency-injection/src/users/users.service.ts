import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  private usersList = [
    {
      userId: 1001,
      userName: 'meow1',
    },
    {
      userId: 1002,
      userName: 'meow2',
    },
    {
      userId: 1003,
      userName: 'meo3',
    },
  ];
  public getUsers(): String {
    if (this.authService.isAuthorized()) {
      return 'all users from service';
    } else {
      return 'you are not authorized to do so';
    }
  }

  public getUserById(id: number): object | undefined {
    return this.usersList.find((user) => user.userId === id);
  }
}
