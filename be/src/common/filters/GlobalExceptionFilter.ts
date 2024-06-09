import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  //예외 catch
  catch(exception: unknown, host: ArgumentsHost) {
    //req, res 루부터 http context 취득
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    //상태코드 결정. 없을경우 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    //에러메세지 입력. 없을경우 500의 메세지
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    //res 에 오류 담아 JSON 으로 전송
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
