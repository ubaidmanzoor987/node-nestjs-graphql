import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class LoginUserOutput {
  @Field(() => String)
  token: string;
}

@ObjectType()
export class CreateUserOutput {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => User, { nullable: true })
  user?: User | null;
}
