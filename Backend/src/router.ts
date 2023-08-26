import {Router} from 'express';

import { CreateProfController } from './controllers/user/prof/CreateProfController';
import { CreateAlunoController } from './controllers/user/aluno/CreateAlunoController';
import { AuthProfController } from './controllers/user/prof/AuthProfController';
import { AuthAlunofController } from './controllers/user/aluno/AuthAlunoController';

const router = Router()

//rota cadastro Usuario
router.post('/userProf', new CreateProfController().handle)
router.post('/userAluno', new CreateAlunoController().handle)
//rota Login Usuario
router.post('/loginProf', new AuthProfController().handle )
router.post('/loginAluno', new AuthAlunofController().handle)


export{router};