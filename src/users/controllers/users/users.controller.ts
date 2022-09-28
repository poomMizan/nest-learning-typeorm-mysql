/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDTO } from 'src/users/dtos/createPost.dto';
import { CreateUserDTO } from 'src/users/dtos/createUser.dto';
import { CreateUserProfileDTO } from 'src/users/dtos/createUserProfile.dto';
import { UpdateUserDTO } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const username = await this.userService.findUsers();
    return username;
  }

  @Post(':id/create_profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDTO: CreateUserProfileDTO,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDTO);
  }

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    this.userService.createUser(createUserDTO);
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.updateUserById(id, updateUserDTO);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Post(':id/posts')
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    return this.userService.createPost(id, createPostDTO);
  }
}
