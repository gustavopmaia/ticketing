import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@gmtickets11/common'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/orders',
  requireAuth,
  [body('ticketId').not().isEmpty().withMessage('Ticket ID must be provided')],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({})
  },
)

export { router as newOrderRouter }
