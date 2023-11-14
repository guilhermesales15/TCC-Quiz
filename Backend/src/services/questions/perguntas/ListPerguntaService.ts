import prismaClient from "../../../prisma";

class ListPerguntaService {
  async execute() {
    const perguntas = await prismaClient.pergunta.findMany({
      orderBy: {
        nivelId: 'desc'
      },

      include: {
        nivel: true, 
        opcoes: true 
      }


    });

    return perguntas;
  }
}

export { ListPerguntaService };
