import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.hostname === 'moviemovit.xyz' && req.path === '/') {
            return res.redirect(301, `http://www.moviemovit.xyz${req.originalUrl}`);
        }
        next();
    }
}
