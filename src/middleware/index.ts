import { type ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import { type Application } from 'express';

export const initializeMiddleware = async (
    app: Application,
    server: ApolloServer
): Promise<void> => {
    app.use(
        cors<cors.CorsRequest>({ origin: '*' }), // Enable CORS for all origins
        bodyParser.json(), // Parse JSON request bodies
        expressMiddleware(server, {
            context: async ({ req, res }) => ({
                req,
                res,
            }),
        })
    );
};
