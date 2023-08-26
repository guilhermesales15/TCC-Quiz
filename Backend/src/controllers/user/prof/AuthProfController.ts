import { Request, Response } from "express";
import { AuthProfService } from "../../../services/users/prof/AuthProfService";

class AuthProfController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body;

        const authProfService = new AuthProfService();

       const auth = await authProfService.execute({
        email,
        password
       })

       return res.json(auth)
    }

}

export {AuthProfController}