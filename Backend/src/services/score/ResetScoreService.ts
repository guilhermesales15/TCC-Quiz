import prismaClient from "../../prisma";

class ResetUserScoreService {
  async execute(userId: string) {
    const user = await prismaClient.userAluno.findUnique({
      where: { id: userId },
    });
    

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Redefina a pontuação para zero
    const updatedUser = await prismaClient.userAluno.update({
      where: { id: userId },
      data: { pointEasy: 0, pointMedium: 0, pointHard: 0 },
    });

    return updatedUser;
  }
}

export { ResetUserScoreService };
