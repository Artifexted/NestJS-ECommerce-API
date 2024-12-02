import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Route: ${req.url} / Method: ${req.method} / Time: ${new Date().toLocaleString()} / Status: ${res.statusCode}`)

    next();
  }
}
