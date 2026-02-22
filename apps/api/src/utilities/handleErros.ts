import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleErrors = (error: any): never => {
  if (error instanceof HttpException) {
    throw error;
  } else {
    throw new InternalServerErrorException('Internal server error');
  }
};
