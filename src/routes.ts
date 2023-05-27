import { Router } from 'express'
import { CreateUserController } from './controllers/user-create-controller'
import { AuthenticateUserController } from './controllers/user-authenticate-controller'
import {authMiddleware} from './middlewares/auth-middleware'
import { GetUserProfileController } from './controllers/user-profile-controller'

const routes = Router()

routes.post('/users', new CreateUserController().handle)
routes.post('/user/authentication', new AuthenticateUserController().handle)

routes.use(authMiddleware)

routes.get('/user/profile', new GetUserProfileController().handle)

export default routes