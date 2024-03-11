import { PrismaClientKnownRequestError } from '.';
import { QueryError } from './QueryError';

export function getPrismaErrorMessage(p_error: PrismaClientKnownRequestError): {
  message: string;
  httpStatus: number;
} {
  const error = QueryError.get(p_error.code);
  if (!error) {
    return {
      message: 'Unknown error',
      httpStatus: 500,
    };
  }
  return {
    message: error.message,
    httpStatus: error.httpStatus,
  };
}
