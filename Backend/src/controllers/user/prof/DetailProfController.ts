import { Request, Response} from "express";
import { DetailProfService } from "../../../services/users/prof/DetailProfService";

class DetailProfController {

    async handle(req: Request, res: Response ){

        const detailProfService = new DetailProfService();

        const prof = await detailProfService.execute();

        return res.json(prof);


    }
}

export {DetailProfController}