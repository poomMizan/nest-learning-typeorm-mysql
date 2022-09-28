import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/post';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
})
export class UsersModule {}
