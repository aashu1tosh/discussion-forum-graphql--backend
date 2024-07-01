/**
 * File: initializeMiddlewares.ts
 * Description: This file initializes and configures various middlewares for an Express application used with Apollo Server.
 */

import { type ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Application } from 'express'
import { DotenvConfig } from '../config/env.config'
import { Environment } from '../constant/enum'
import path from 'path'

/**
 * @function initializeMiddlewares
 * @param {Application} app - The Express application instance to which middlewares will be applied.
 * @param {ApolloServer<IContext>} server - The Apollo Server instance to integrate with the Express application.
 * @returns {Promise<void>}
 * @description Initializes and configures various middlewares for an Express application used with Apollo Server.
 */
export const initializeMiddlewares = async (app: Application, server: ApolloServer<any>): Promise<void> => {

  // Apply various middlewares to the Express app
  app.use(
    cors<cors.CorsRequest>({ origin: '*' }), // Enable CORS for all origins
    bodyParser.json(), // Parse JSON request bodies
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
        token: req.headers.authorization?.split(' ')[1], // Extract and provide the authorization token to the GraphQL context
      }),
    })
  )
}
