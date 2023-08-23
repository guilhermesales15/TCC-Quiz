import { Request, Response } from "express";
import { CreateAlunoService } from "../../../services/users/aluno/CreateAlunoService";


class CreateAlunoController{
    async handle(req: Request, res: Response){

        const {name, email, password, birthDate} = req.body 
        
        const createProfService = new CreateAlunoService();

        const user = await createProfService.execute({
            name,
            email,
            password,
            birthDate
        }
        
        )

        return res.json(user)
    }

}

export {CreateAlunoController};