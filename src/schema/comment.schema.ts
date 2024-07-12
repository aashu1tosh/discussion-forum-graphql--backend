import { Field, ObjectType } from 'type-graphql';
import BaseSchema from './base.schema';
import { UserSchema } from './user.schema';

@ObjectType()
export class CommentSchema extends BaseSchema {

    @Field({ nullable: true })
    comment!: string;

    @Field(() => UserSchema, { nullable: true })
    auth!: UserSchema;
}
