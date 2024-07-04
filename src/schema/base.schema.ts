/**
 * File: BaseSchema.ts
 * Description: This file defines an abstract base schema class using the TypeGraphQL decorators, which includes common fields found in various data schema objects.
 */

import { Field, ID, ObjectType } from 'type-graphql';

/**
 * @abstract
 * @class BaseSchema
 * @description An abstract base schema class that includes common fields found in various data schema objects. This class is intended to be extended by other schema classes.
 */
@ObjectType() // Decorator specifying that this class represents a GraphQL ObjectType
abstract class BaseSchema {
    /**
     * @property id
     * @type {string}
     * @description The unique identifier for the schema object. It is of type ID, which is typically a string.
     * @nullable
     */
    @Field(() => ID, { nullable: true })
    id!: string;

    /**
     * @property createdAt
     * @type {Date}
     * @description The timestamp indicating when the schema object was created or instantiated.
     * @nullable
     */
    @Field({ nullable: true })
    createdAt!: Date;

    /**
     * @property updatedAt
     * @type {Date}
     * @description The timestamp indicating when the schema object was last updated or modified.
     * @nullable
     */
    @Field({ nullable: true })
    updatedAt!: Date;

    /**
     * @property deletedAt
     * @type {Date}
     * @description The timestamp indicating when the schema object was soft-deleted or marked as deleted. This field is commonly used in soft delete systems.
     * @nullable
     */
    @Field({ nullable: true })
    deletedAt!: Date;
}

export default BaseSchema;
