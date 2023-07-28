import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const checkParamType = (req: Request, res: Response, next: NextFunction) => {
  const idParam: string = req.params.id;
  if (!/^\d+$/.test(idParam)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid parameter type: id must be an integer' });
  }
  next();
};
