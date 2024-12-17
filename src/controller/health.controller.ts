import { Request, Response } from 'express';

export const getHealth = (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ message: 'Testing success', data: 'lagi santai kaawan' });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
