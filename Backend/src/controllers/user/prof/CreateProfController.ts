import { Request, Response } from "express";
import { CreateProfService } from "../../../services/users/prof/CreateProfService";

class CreateProfController{
    async handle(req: Request, res: Response){

        const {name, email, password} = req.body 
        
        const createUserService = new CreateProfService();

        const user = await createUserService.execute({
            name,
            email,
            password
        }
        
        )

        return res.json(user)
    }

}

export {CreateProfController};