import { Request, Response } from 'express';
import { ResetUserScoreService } from '../../services/score/ResetScoreService';
class ResetScoreController {
  async handle (req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const resetUserScoreService = new ResetUserScoreService();
      const user = await resetUserScoreService.execute(userId);

      return res.json({ message: 'Pontuação do usuário redefinida com sucesso', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao redefinir a pontuação do usuário' });
    }
  }
}

export { ResetScoreController}