import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public getAllPost(): object {
    return this.postsService.getAllPost();
  }

  @Get(':userId')
  public getAllPostByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): object | undefined {
    return this.postsService.getAllPostByUserId(userId);
  }
}
