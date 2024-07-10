/**
 * File: BaseSchema.ts
 * Description: This file defines an abstract base schema class using the TypeGraphQL decorators, which includes common fields found in various data schema objects.
 */

import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType() // Decorator specifying that this class represents a GraphQL ObjectType
abstract class BaseSchema {
    @Field(() => ID, { nullable: true })
    id!: string;

    @Field({ nullable: true })
    createdAt!: Date;

    @Field({ nullable: true })
    updatedAt!: Date;

    @Field({ nullable: true })
    deletedAt!: Date;
}

export default BaseSchema;
