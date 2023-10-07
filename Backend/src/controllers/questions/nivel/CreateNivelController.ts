
import { Request, Response } from "express";
import { CreateNivelService } from "../../../services/questions/nivel/CreateNivelService";



class CreateNivelController{
    async handle(req:Request, res:Response){

        const {nome} = req.body;

        const createNivelService = new CreateNivelService();
        
        const nivel = await createNivelService.execute({
            nome
        })

        return res.json(nivel);
    }
}

export {CreateNivelController}