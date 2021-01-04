
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  const tokenOnly = (bearerToken || '').split('Bearer ')[1];

  if(!tokenOnly) {
      return res.status(401).json({
          message: 'Unauthorized',
          error: true
      });
  }

  try {
      const decoded = JWT.verify(tokenOnly, process.env.JWT_SECRET!);
      res.locals.user = decoded;

      return next();
  } catch(e) { 
      return res.status(403).json({
          message: 'Forbidden',
          error: true
      });
  }
}