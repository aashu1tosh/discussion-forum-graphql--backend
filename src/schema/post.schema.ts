import { Field, ObjectType } from 'type-graphql';
import BaseSchema from './base.schema';

@ObjectType()
export class PostSchema extends BaseSchema {
    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    tags!: string;

    @Field()
    userId!: string;
}
