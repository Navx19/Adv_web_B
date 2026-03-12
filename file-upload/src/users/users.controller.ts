import { FilesController } from './../files/files.controller';
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { ParamDto } from './dto/param.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUsers(): String {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() paramDto: ParamDto): String {
    return this.userService.getUserById(paramDto.id);
  }

  @Get(':id/:postId')
  getUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Query('name', new DefaultValuePipe('tom')) name?: string,
  ): String {
    if (name != undefined) {
      return `user posts for user ${id} and post ${postId} with name ${name}`;
    } else {
      return `user posts for user ${id} and post ${postId}`;
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('only image files and pdf are accepted'),
            false,
          );
        }
      },

      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): string {
    console.log(createUserDto);
    return `create user with name ${createUserDto.name}, email ${createUserDto.email}, age ${createUserDto.age} and password ${createUserDto.password} and file name: ${file.filename}`;
  }

  @Put(':id')
  updateUser(): String {
    return 'update user';
  }

  @Patch(':id')
  updateUserPartially(@Body() partialUpdateUser: PartialUpdateUserDto): String {
    return 'update user partially';
  }

  @Delete(':id')
  deleteUser(): String {
    return 'delete user';
  }
}
