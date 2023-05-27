import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UnauthorizedError } from '../helpers/api-error'
import { userRepository } from '../repositories/user-repository'

type JwtPayload = {
	id: string
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError()
	}

	const token = authorization.split(' ')[1]
	console.log('token -> ')
	try {
		const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload	
		const user = await userRepository.findOneBy({ id })

		if (!user) {
			throw new UnauthorizedError()
		}

		const { password: _, ...loggedUser } = user

		req.user = loggedUser

		
	} catch (error) {
		throw new UnauthorizedError();
	}
	next()
}