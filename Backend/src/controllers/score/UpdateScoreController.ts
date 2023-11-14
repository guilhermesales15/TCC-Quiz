import { Request, Response } from 'express';
import { UpdateUserScoreService } from '../../services/score/UpdateScoreService';

class UserScoreController {
  async handle(req: Request, res: Response) {
    const { userId, scoreType } = req.body; // Remova a variável "newScore" do corpo da solicitação

    const updateUserScoreService = new UpdateUserScoreService();

    try {
      const user = await updateUserScoreService.execute(userId, scoreType);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { UserScoreController };
