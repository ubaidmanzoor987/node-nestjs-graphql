import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Todo, TodoDocument } from './todo.model';
import { CreateTodoInput, ListTodoInput, UpdateTodoInput } from './todo.inputs';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  create(payload: CreateTodoInput) {
    return new this.todoModel(payload).save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.todoModel.findById(_id).exec();
  }

  list(filters: ListTodoInput) {
    return this.todoModel.find({ ...filters }).exec();
  }

  update(payload: UpdateTodoInput) {
    return this.todoModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.todoModel.findByIdAndDelete(_id).exec();
  }
}
