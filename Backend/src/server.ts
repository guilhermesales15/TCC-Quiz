import express ,{Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors';

import { router } from './router';

const app = express();
app.use(express.json());
app.use(cors());
//para qualquer ip poder fazer requisição

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }
    //Quando  um requisição incorreta for feita no servidor

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
    // Erro interno no servidor

})

app.listen(3333, () => console.log('Server On'));