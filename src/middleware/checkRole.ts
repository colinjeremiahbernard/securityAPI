import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from './checkJwt';
import { getUser, Roles } from '../state/users';

export const checkRole = (roles: Array<Roles>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Find the user with the requested ID.
        const user = getUser((req as CustomRequest).token.payload.userId);

        // Ensure we found a user.
        if (!user) {
            res.status(404)
                .type('json')
                .send(JSON.stringify({ message: 'User not found' }));
            return;
        }

        // Ensure the user's role is contained in the authorized roles.
        if (roles.indexOf(user.role) > -1) next();
        else {
            res.status(403)
                .type('json')
                .send(JSON.stringify({ message: 'Not enough permissions' }));
            return;
        }
    };
};