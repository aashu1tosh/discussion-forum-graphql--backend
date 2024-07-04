import { Field, ObjectType } from 'type-graphql';
import { UserSchema } from './user.schema';

@ObjectType()
export class UserLoginSchema {
    @Field({ nullable: true })
    accessToken!: string;

    @Field(() => UserSchema)
    user!: UserSchema;
}

@ObjectType()
export class UserRegisterSchema {

    @Field(() => UserSchema)
    user!: UserSchema;
}
