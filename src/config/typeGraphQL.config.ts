import { type GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'

export class TypeGraphQL {
    async schema(): Promise<GraphQLSchema> {
        return await buildSchema({
            // Resolvers path: Specifies where to find resolver classes using glob pattern.
            // In this example, it searches for resolver classes in the specified directory and its subdirectories.
            resolvers: [__dirname + '/../resolvers/**/*.resolver.ts'],
            // Validation: Disable automatic schema validation during development.
            validate: false,
            // Emit Schema File: Set to false to disable automatic schema file generation.
            emitSchemaFile: false,
        })
    }
}

