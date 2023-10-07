
import { Request, Response } from 'express';
import { PerguntaService } from '../../../services/questions/perguntas/CreatePerguntaService';

class CreatePerguntaController {
 async handle(request: Request, response: Response): Promise<Response> {
    const { texto, nivelId, opcoes, banner } = request.body;

    const perguntaService = new PerguntaService();

    const pergunta = await perguntaService.createPergunta({
        texto,
        nivelId,
        opcoes,
        banner,
       });

    return response.json(pergunta);
 }
}

export { CreatePerguntaController };