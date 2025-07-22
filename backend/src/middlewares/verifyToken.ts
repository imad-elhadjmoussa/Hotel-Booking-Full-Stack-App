import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string; // Attach user info to request object
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction)  => {
    const token = req.cookies["auth_token"]

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.userId = decoded.id; // Attach user info to request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }
}

export default verifyToken;