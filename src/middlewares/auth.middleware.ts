// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';
import { CustomRequest } from 'src/interfaces/common.interface';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!!token) {
          const userId = await this.authService.getUserId(token);
          req.userId = userId;
          return next();
        }
    
        return res.status(403)
    } catch (error) {
        return res.status(500).json({error})
    }

  }
}
