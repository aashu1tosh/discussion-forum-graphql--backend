import { Field, ObjectType } from 'type-graphql';
import BaseSchema from './base.schema';

@ObjectType()
export class UserSchema extends BaseSchema {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    role!: string;

    @Field()
    phone!: string;
}
