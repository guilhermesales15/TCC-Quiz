
import { PrismaClient, Pergunta, Nivel, Opcao } from '@prisma/client';

class PerguntaService {
 private prisma: PrismaClient;

 constructor() {
    this.prisma = new PrismaClient();
 }

 async createPergunta(data: { texto: string, nivelId: number, opcoes: Opcao[], banner: string }): Promise<Pergunta> {
    const { texto, nivelId, opcoes, banner } = data;

    const pergunta = await this.prisma.pergunta.create({
      data: {
        texto,
        nivel: {
          connect: { id: nivelId },
        },
        opcoes: {
          create: opcoes,
        },
        banner,
      },
    });

    return pergunta;
 }
}

export {PerguntaService};