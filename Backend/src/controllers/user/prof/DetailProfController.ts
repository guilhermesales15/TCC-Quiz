import { Request, Response} from "express";
import { DetailProfService } from "../../../services/users/prof/DetailProfService";

class DetailProfController {

    async handle(req: Request, res: Response ){

        const user_id = req.user_id

        const detailProfService = new DetailProfService();

        const prof = await detailProfService.execute(user_id);

        return res.json(prof);


    }
}

export {DetailProfController}