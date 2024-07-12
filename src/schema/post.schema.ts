import { Field, ObjectType } from 'type-graphql';
import BaseSchema from './base.schema';
import { UserSchema } from './user.schema';

@ObjectType()
export class PostSchema extends BaseSchema {
    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field(() => [String])
    tags!: string[];

    @Field(() => UserSchema)
    user!: UserSchema;
}
