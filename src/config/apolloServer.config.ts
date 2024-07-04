import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import type http from 'http';
import { Environment } from '../constant/enum';
import { DotenvConfig } from './env.config';
import { TypeGraphQL } from './typeGraphQL.config';

export class Apollo {
    async server(
        httpServer: http.Server<
            typeof http.IncomingMessage,
            typeof http.ServerResponse
        >
    ) {
        return new ApolloServer({
            schema: await new TypeGraphQL().schema(),
            csrfPrevention: false,
            introspection: DotenvConfig.NODE_ENV === Environment.DEVELOPMENT,
            includeStacktraceInErrorResponses:
                DotenvConfig.NODE_ENV === Environment.DEVELOPMENT,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
    }
}
