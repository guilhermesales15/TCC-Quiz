import { PrismaClient } from '@prisma/client';

class DeletePerguntaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(id: number) {
    try {
      
      await this.prisma.opcao.deleteMany({
        where: { perguntaId: id },
      });

      const deletedPergunta = await this.prisma.pergunta.delete({
        where: { id },
      });

      return deletedPergunta;
    } catch (error) {
      throw new Error('Erro ao excluir a pergunta e seus itens relacionados');
    }
  }
}

export { DeletePerguntaService };
