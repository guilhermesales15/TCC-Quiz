import { Request, Response } from "express";
import { AuthAlunoService } from "../../../services/users/aluno/AuthAlunoService";

class AuthAlunofController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body;

        const authAlunoService = new AuthAlunoService();

       const auth = await authAlunoService.execute({
        email,
        password
       })

       return res.json(auth)
    }

}

export {AuthAlunofController}