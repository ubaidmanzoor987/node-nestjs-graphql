import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { CreateTodoInput, ListTodoInput, UpdateTodoInput } from './todo.inputs';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => Todo)
  async todo(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.todoService.getById(_id);
  }

  @Query(() => [Todo])
  async todos(@Args('filters', { nullable: true }) filters?: ListTodoInput) {
    return this.todoService.list(filters);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('payload') payload: CreateTodoInput) {
    return this.todoService.create(payload);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('payload') payload: UpdateTodoInput) {
    return this.todoService.update(payload);
  }

  @Mutation(() => Todo)
  async deleteTodo(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.todoService.delete(_id);
  }
}
