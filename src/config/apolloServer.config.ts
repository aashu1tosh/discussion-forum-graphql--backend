/**
 * File: Apollo.ts
 * Description: This file contains a class for configuring and creating an Apollo Server for GraphQL.
 */

import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import type http from 'http'
import { Environment } from '../constant/enum'
import { DotenvConfig } from './env.config'
import { TypeGraphQL } from './typeGraphQL.config'

export class Apollo {

    async server(
        httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    ): Promise<ApolloServer<any>> {
        return new ApolloServer<any>({
            // Schema: Configures the GraphQL schema for the server using TypeGraphQL.
            schema: await new TypeGraphQL().Schema(),

            // CSRF Prevention: Disable CSRF prevention for simplicity.
            csrfPrevention: false,

            // Introspection: Enable introspection for development environment only.
            introspection: DotenvConfig.NODE_ENV === Environment.DEVELOPMENT,

            // Include Stack Trace: Include stack traces in error responses for development.
            includeStacktraceInErrorResponses: DotenvConfig.NODE_ENV === Environment.DEVELOPMENT,

            // Format Error: Customize error formatting using the formatError function.
            formatError: (formattedError) => {
                return formattedError
            },

            // Plugins: Add the Apollo Server Plugin for draining the HTTP server.
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        })
    }
}
