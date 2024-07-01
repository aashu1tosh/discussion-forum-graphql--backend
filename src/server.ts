/**
 * File: server.ts
 * Description: This file sets up an Express.js server with Apollo Server for GraphQL.
 */

import express from 'express'
import http from 'http'
import 'reflect-metadata'
import { Apollo } from './config/apolloServer.config'
import { AppDataSource } from './config/database.config'
import { DotenvConfig } from './config/env.config'
import { initializeMiddlewares } from './middleware/index'
import Print from './utils/Print'

/**
 * @function startServer
 * @description Initializes and starts the Express.js server with Apollo Server for GraphQL.
 * @returns {Promise<void>}
 */
async function startServer(): Promise<void> {
    // Create an Express application
    const app = express()

    try {
        // Initialize the database connection
        await AppDataSource.initialize()
        Print.info(`🚀 Database successfully connected`)
    } catch (err: any) {
        // Handle database connection errors
        Print.error(`❌ Database connection failure - ${err?.message}`)
    }

    // Create an HTTP server using Express
    const server = http.createServer(app)

    // Initialize Apollo Server for GraphQL
    const apollo = await new Apollo().server(server)
    await apollo.start()

    // Initialize middleware for Express
    await initializeMiddlewares(app, apollo)

    // Define the port to listen on
    const port = DotenvConfig.PORT

    // Start the server and listen on the specified port
    server.listen(port, () => {
        Print.info(`🚀 Server is listening on port ${port}`)
    })
}

// Start the server by calling the startServer function
try {
    void startServer()
} catch (err: any) {
    // Handle errors that occur while starting the server
    Print.error(`❌ Error while starting the server - ${err}`)
    process.exit(1)
}
