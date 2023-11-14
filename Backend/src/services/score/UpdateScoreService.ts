import prismaClient from "../../prisma";

class UpdateUserScoreService {
  async execute(userId: string, scoreType: string) {
    const user = await prismaClient.userAluno.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    
    let currentScore = 0;
    if (scoreType === 'pointEasy') {
      currentScore = user.pointEasy;
    } else if (scoreType === 'pointMedium') {
      currentScore = user.pointMedium;
    } else if (scoreType === 'pointHard') {
      currentScore = user.pointHard;
    } else {
      throw new Error('Tipo de pontuação inválido');
    }

   
    const newScore = currentScore + 1;

    
    if (scoreType === 'pointEasy') {
      await prismaClient.userAluno.update({
        where: { id: userId },
        data: { pointEasy: newScore },
      });
    } else if (scoreType === 'pointMedium') {
      await prismaClient.userAluno.update({
        where: { id: userId },
        data: { pointMedium: newScore },
      });
    } else if (scoreType === 'pointHard') {
      await prismaClient.userAluno.update({
        where: { id: userId },
        data: { pointHard: newScore },
      });
    } else {
      throw new Error('Tipo de pontuação inválido');
    }

    return user;
  }
}

export { UpdateUserScoreService };
