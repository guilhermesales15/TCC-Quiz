import { Request, Response} from "express";
import { DetailAlunoService } from "../../../services/users/aluno/DetailAlunoService";

class DetailAlunoController {

    async handle(req: Request, res: Response ){

        const user_id = req.user_id

        const detailAlunoService = new DetailAlunoService();

        const aluno = await detailAlunoService.execute(user_id);

        return res.json(aluno);


    }
}

export {DetailAlunoController}