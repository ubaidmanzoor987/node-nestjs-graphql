import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { User, UserDocument } from './user.model';
import {
  CreateUserInput,
  LisUsersInput,
  LoginUserInput,
  UpdateUserInput,
} from './user.inputs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(payload: CreateUserInput) {
    const isUserExist = await this.getByUserName(payload.userName);
    if (isUserExist && isUserExist.userName) {
      return {
        message: 'userName Already Exists',
        user: null,
      };
    }
    const user = new this.userModel(payload).save();
    return {
      message: 'Successfully Created',
      user,
    };
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(_id).exec();
  }

  getByUserName(userName: string) {
    return this.userModel.findOne({ userName }).exec();
  }

  async login(request: LoginUserInput) {
    const user = await this.validateUser(request.userName, request.password);
    return {
      token: this.jwtService.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        { subject: `${user._id}` },
      ),
    };
  }

  list(filters: LisUsersInput) {
    return this.userModel.find({ ...filters }).exec();
  }

  update(payload: UpdateUserInput) {
    return this.userModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(_id).exec();
  }

  validateUser(userName: string, password: string): Promise<User> {
    return this.userModel
      .findOne({
        userName,
        password,
      })
      .exec();
  }
}
