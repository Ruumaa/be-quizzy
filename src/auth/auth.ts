import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { hash } from 'bcrypt';
import { User } from '../types/user.type';
import { generateToken } from '../../lib/jwt';

const router = express.Router();

// register
router.post(
  '/sign-up',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password }: User = await req.body;
      const existUsername = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (existUsername) {
        return res.status(400).json({ message: 'Username already exist' });
      }

      const hashedPassword = await hash(password, 10);
      const data = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      const { password: userPassword, ...userData } = data;

      res.status(201).json({ message: 'Register success', data: userData });
    } catch (error: Error | any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// login

router.post(
  '/sign-in',
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { username, password } = await req.body;
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (!existingUser)
        return res.status(401).json({ message: 'Username not found' });

      const accessToken = generateToken({
        id: existingUser.id,
        username: existingUser.username,
      });

      res
        .status(200)
        .json({ message: 'Sign in success', accessToken, id: existingUser.id });
    } catch (error: Error | any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

export { router as AuthRouter };
