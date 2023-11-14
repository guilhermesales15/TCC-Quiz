import { Request, Response } from "express";
import { ListPerguntaService } from "../../../services/questions/perguntas/ListPerguntaService";

class ListPerguntaController{
    async handle(req: Request, res: Response){
        const listPerguntaService = new ListPerguntaService();

        const pergunta = await listPerguntaService.execute()

        return res.json(pergunta)
    }


}

export {ListPerguntaController}