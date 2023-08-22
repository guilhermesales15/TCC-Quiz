import {Router} from 'express';

import { CreateProfController } from './controllers/user/prof/CreateProfController';

const router = Router()

//rota cadastro Usuario-Professor
router.post('/userProf', new CreateProfController().handle)


export{router};