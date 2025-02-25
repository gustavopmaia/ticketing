import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('returns 404 if id not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'My Title',
      price: 30,
    })
    .expect(404)
})

it('returns 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'My Title',
      price: 30,
    })
    .expect(401)
})

it('returns 401 if user does not own the ticket', async () => {})

it('returns 400 if user provides invalid title or price', async () => {})

it('updates the ticket with valid inputs', async () => {})
