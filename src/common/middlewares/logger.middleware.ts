import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, path, query, params, body } = req;
    const reqBody = {
      query,
      params,
      body,
    };
    this.logger.log(
      `HTTP REQUEST IP: ${ip} --- ${method}: ${path}: ${JSON.stringify(
        reqBody,
        null,
        2,
      )}`,
    );
    const originalJson = res.json;
    let resBody: any = {};
    res.json = (data) => {
      resBody = data;
      return originalJson.call(res, data);
    };
    res.on('finish', () => {
      const statusCode = resBody?.statusCode;
      if (`${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5'))
        this.logger.error(
          `HTTP RESPONSE IP: ${ip} - ${method}: ${path} STATUS: ${statusCode}: ${JSON.stringify(
            resBody,
            null,
            2,
          )}`,
        );
      else
        this.logger.log(
          `HTTP RESPONSE IP: ${ip} - ${method}: ${path} STATUS: ${statusCode}: ${JSON.stringify(
            resBody,
            null,
            2,
          )}`,
        );
    });
    next();
  }
}
