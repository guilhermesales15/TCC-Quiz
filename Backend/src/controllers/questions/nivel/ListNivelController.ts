import { Request, Response } from "express";
import { ListNivelSercice } from "../../../services/questions/nivel/ListNivelSerivices";

class ListNivelController{
    async handle( req: Request, res: Response){
        const listNivelSerice = new ListNivelSercice();

        const nivel = await listNivelSerice.execute();

        return res.json(nivel)

    }
}

export {ListNivelController}