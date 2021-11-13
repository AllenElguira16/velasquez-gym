import { NextFunction, Request, Response } from 'express';

/**
 * Export all types from global
 */
export * from '../../global';

/**
 * Types for Controller function
 */
export type TController = (oRequest: Request, oResponse: Response, oNext: NextFunction) => Promise<void> | void;

/**
 * Types for Middleware function
 */
export type TMiddleware = (next: (oRequest: Request, oResponse: Response) => Promise<void> | void) => TController

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
