import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from './user.model';
import { UserService } from './user.service';
import {
  CreateUserInput,
  LisUsersInput,
  LoginUserInput,
  UpdateUserInput,
} from './user.inputs';
import { CreateUserOutput, LoginUserOutput } from './user.output';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(@Args('filters', { nullable: true }) filters?: LisUsersInput) {
    return this.userService.list(filters);
  }

  @Mutation(() => CreateUserOutput)
  async createUser(@Args('payload') payload: CreateUserInput) {
    return this.userService.create(payload);
  }

  @Mutation(() => User)
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.userService.update(payload);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.delete(_id);
  }

  @Query(() => LoginUserOutput)
  async login(@Args('payload') payload: LoginUserInput) {
    return this.userService.login(payload);
  }
}
