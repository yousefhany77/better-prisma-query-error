import { getPrismaErrorMessage } from './util';

export declare class PrismaClientKnownRequestError extends Error implements ErrorWithBatchIndex {
  code: string;
  meta?: Record<string, unknown>;
  clientVersion: string;
  batchRequestIdx?: number;
  constructor(message: string, { code, clientVersion, meta, batchRequestIdx }: KnownErrorParams);
  get [Symbol.toStringTag](): string;
}

declare interface ErrorWithBatchIndex {
  batchRequestIdx?: number;
}

declare type KnownErrorParams = {
  code: string;
  clientVersion: string;
  meta?: Record<string, unknown>;
  batchRequestIdx?: number;
};

export class prismaError extends Error {
  statusCode: number;
  title: string;
  metaData?: string;

  constructor(error: PrismaClientKnownRequestError) {
    const { message, httpStatus } = getPrismaErrorMessage(error);
    super(message);
    this.title = 'Prisma Error';
    this.statusCode = httpStatus;
    this.metaData = error.meta && JSON.parse(JSON.stringify(error.meta));
  }
}
