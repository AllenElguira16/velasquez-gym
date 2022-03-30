import { NextFunction, Request, Response } from 'express';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  type: 'member'|'admin';
  fitness?: IFitness|null;
  attendances?: IAttendance[]
  memberships?: IMembership[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFitness {
  id: string;
  type: string;
  img: string|null;
  virtualAssistance?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMembership {
  id: string;
  user: IUser;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttendance {
  id: string;
  user: IUser;
  type: 'check-in'|'check-out'
  createdAt: Date;
  updatedAt: Date;
}

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
