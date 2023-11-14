import {Router} from 'express';


import { CreateProfController } from './controllers/user/prof/CreateProfController';
import { CreateAlunoController } from './controllers/user/aluno/CreateAlunoController';
import { AuthProfController } from './controllers/user/prof/AuthProfController';
import { AuthAlunofController } from './controllers/user/aluno/AuthAlunoController';
import { DetailProfController } from './controllers/user/prof/DetailProfController';
import { DetailAlunoController } from './controllers/user/aluno/DetailAlunoController';
import { CreateNivelController } from './controllers/questions/nivel/CreateNivelController';
import { ListNivelController } from './controllers/questions/nivel/ListNivelController';
import { CreatePerguntaController} from './controllers/questions/question/CreatePerguntaController'
import { ListPerguntaController } from './controllers/questions/question/ListPerguntaController';
import { DeletePerguntaController } from './controllers/questions/question/DeletePerguntaController';
import { UserScoreController } from './controllers/score/UpdateScoreController';
import { ResetScoreController } from './controllers/score/ResetScoreController';


import { Authenticated } from './middlewares/Authenticated';



const router = Router()



//rota cadastro Usuario
router.post('/userProf', new CreateProfController().handle)
router.post('/userAluno', new CreateAlunoController().handle)
//rota Login Usuario
router.post('/loginProf', new AuthProfController().handle )
router.post('/loginAluno', new AuthAlunofController().handle)

//rota trazendo as informações do usuário
router.get('/detailProf', Authenticated, new DetailProfController().handle)
router.get('/detailAluno', Authenticated, new DetailAlunoController().handle)

//rotas Dificuldade
router.post('/nivel', Authenticated, new CreateNivelController().handle )
router.get('/listNivel', Authenticated, new ListNivelController().handle)

//rotas Questões
router.post('/pergunta', Authenticated, new CreatePerguntaController().handle)
router.get('/listPergunta',Authenticated, new ListPerguntaController().handle)
router.delete('/deletePergunta/:id',Authenticated, new DeletePerguntaController().handle)


//rotas de pontos
router.put('/score', Authenticated, new UserScoreController().handle);
router.put('/reset/:userId', Authenticated, new ResetScoreController().handle);








export{router};