import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getQuizSession = async (req: Request, res: Response) => {
  try {
    const data = await prisma.quizSessions.findMany();
    return res.status(200).json({ message: 'Get quiz session success', data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getQuizSessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existSession = await prisma.quizSessions.findUnique({
      where: {
        id,
      },
    });

    if (!existSession) {
      return res
        .status(409)
        .json({ message: `Quiz Session with id ${id} not found!` });
    }

    return res
      .status(200)
      .json({ message: 'Get quiz session success', existSession });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const addQuizSession = async (req: Request, res: Response) => {
  try {
    const data = await prisma.quizSessions.create({
      data: req.body,
    });
    return res.status(200).json({ message: 'Add quiz session success', data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { current_question_idx, user_answers, time_left } = await req.body;

    const existSession = await prisma.quizSessions.findUnique({
      where: {
        id,
      },
    });

    if (!existSession) {
      return res
        .status(409)
        .json({ message: `Quiz Session with id ${id} not found!` });
    }

    const data = await prisma.quizSessions.update({
      where: { id },
      data: { current_question_idx, user_answers, time_left },
    });
    return res
      .status(200)
      .json({ message: 'Update Quiz Session Success', data });
  } catch (error: Error | any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
