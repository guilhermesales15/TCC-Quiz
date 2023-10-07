import { Request, Response } from "express";
import { CreateItemService } from "../../../services/questions/item/CreateItemService";

class CreateItemController{

    async handle(req:Request, res: Response){

        const{texto, correta, pergunta_id} =req.body;

        const createItemService = new CreateItemService()

        const item = await createItemService.execute({
            texto, 
            correta,
            pergunta_id
        });

        return res.json(item)
    }

}

export {CreateItemController}