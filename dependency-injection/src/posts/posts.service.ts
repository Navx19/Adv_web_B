import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}
  public getAllPost(): object {
    return [
      {
        postId: 'P-1',
        content: 'P-1 content',
      },

      {
        postId: 'P-1',
        content: 'P-1 content',
      },
    ];
  }

  public getAllPostByUserId(id: number): object | undefined {
    const user = this.userService.getUserById(id);
    if (user != undefined) {
      return [
        {
          user: user,
          postId: 'p-1',
          content: 'meow content',
        },
        {
          user: user,
          postId: 'p-2',
          content: 'meow content2',
        },
      ];
    }
  }
}
