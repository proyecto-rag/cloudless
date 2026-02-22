import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleErrors = (error: any): HttpException => {
  if (error instanceof HttpException) {
    return error;
  }

  return new InternalServerErrorException('Internal server error');
};
