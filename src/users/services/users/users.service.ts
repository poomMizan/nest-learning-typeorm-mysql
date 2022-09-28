/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/post';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  UpdateUserParams,
  CreateUserProfileParams,
  CreatePostParams,
} from 'src/users/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }
  createUser(createUserParams: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...createUserParams,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
  async createUserProfile(
    id: number,
    createUserProfileParams: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `User id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
      // return `User id:${id} not found`;
    }
    const newProfile = this.profileRepository.create(createUserProfileParams);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
  updateUserById(id: number, updateUserParams: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserParams });
  }
  deleteUserById(id: number) {
    return this.userRepository.delete({ id });
  }
  async createPost(id: number, createPostParams: CreatePostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `User id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
      // return `User id:${id} not found`;
    }
    const newPost = this.postRepository.create({
      ...createPostParams,
      user,
      createdAt: new Date(),
    });
    return await this.postRepository.save(newPost);
  }
}
