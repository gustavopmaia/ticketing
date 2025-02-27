import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError, currentUser } from '@gmtickets11/common'
import { deleteOrderRouter } from './routes/delete'
import { indexOrderRouter } from './routes'
import { newOrderRouter } from './routes/new'
import { showOrderRouter } from './routes/show'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
)
app.use(currentUser)

app.use(indexOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)

app.all('*', async (_req, _res, next) => {
  next(new NotFoundError())
})

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    errorHandler(err, req, res, next)
  },
)

export { app }
