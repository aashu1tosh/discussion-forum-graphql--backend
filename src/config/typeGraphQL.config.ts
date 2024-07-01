/**
 * File: TypeGraphQL.ts
 * Description: This file contains a class for building a GraphQL schema using TypeGraphQL.
 */

import { type GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'

/**
 * @class TypeGraphQL
 * @description A class for building a GraphQL schema using TypeGraphQL decorators and resolvers.
 */

export class TypeGraphQL {
  /**
   * @method Schema
   * @returns {Promise<GraphQLSchema>} - A promise that resolves to the GraphQL schema.
   * @description Builds and returns a GraphQL schema using TypeGraphQL.
   */
  async Schema(): Promise<GraphQLSchema> {
    return await buildSchema({
      // Resolvers path: Specifies where to find resolver classes using glob pattern.
      // In this example, it searches for resolver classes in the specified directory and its subdirectories.
      // eslint-disable-next-line n/no-path-concat
      resolvers: [__dirname + '/../resolvers/**/*.resolver.ts'],
      // Validation: Disable automatic schema validation during development.
      validate: false,
      // Emit Schema File: Set to false to disable automatic schema file generation.
      emitSchemaFile: false,
    })
  }
}
