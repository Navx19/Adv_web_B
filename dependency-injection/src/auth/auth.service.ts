import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public login(id: number): object | undefined {
    const user = this.usersService.getUserById(id);
    if (user != undefined) {
      return user;
    }
  }

  public isAuthorized(): boolean {
    return true;
  }
}
