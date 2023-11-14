import { Request, Response } from 'express';
import { DeletePerguntaService } from "../../../services/questions/perguntas/DeletePerguntaService";

class DeletePerguntaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const deletePerguntaService = new DeletePerguntaService(); 

    try {
      const deletedPergunta = await deletePerguntaService.execute(Number(id));

      if (deletedPergunta) {
        return res.status(204).send("Pergunta excluída com sucesso");
      } else {
        return res.status(404).json({ error: "Pergunta não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao excluir a pergunta:", error);
      return res.status(500).json({ error: "Erro ao excluir a pergunta" });
    }
  }
}

export { DeletePerguntaController };
