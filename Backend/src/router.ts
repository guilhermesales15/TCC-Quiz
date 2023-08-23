import {Router} from 'express';

import { CreateProfController } from './controllers/user/prof/CreateProfController';
import { CreateAlunoController } from './controllers/user/aluno/CreateAlunoController';

const router = Router()

//rota cadastro Usuario-Professor
router.post('/userProf', new CreateProfController().handle)
router.post('/userAluno', new CreateAlunoController().handle)


export{router};