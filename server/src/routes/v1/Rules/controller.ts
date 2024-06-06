import { Request, Response, NextFunction } from 'express'
import RuleServices from './service'
import { successResponse } from '../../../utils/HttpResponse'
import { messages } from '../../../utils/Messages'
import { errorHandler } from '../../../utils/Error'
import InputValidation from 'utils/InputValidation'

const RuleController = {

    async getRules(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = res.locals.user as { _id: string }

            InputValidation.validateid(req.params.id)

            const result = await RuleServices.getRules(authorId._id)

            return successResponse({
                response: res,
                message: messages.task.one_get_success,
                status: 200,
                data: result
            })
        }
        catch (error) {
            next(errorHandler(res, error))
        }
    },
    async updateRules(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = res.locals.user as { _id: string }
            const result = await RuleServices.updateRules(authorId)
            return successResponse({
                response: res,
                message: messages.task.one_get_success,
                status: 200,
                data: result
            })
        }
        catch (error) {
            next(errorHandler(res, error))
        }
    }
}

export default RuleController;