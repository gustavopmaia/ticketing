import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { natsWrapper } from '../../nats-wrapper'

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({})

  expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401)

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})

  expect(response.status).not.toEqual(401)
})

it('returns an error if invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 20,
    })
    .expect(400)
})

it('returns an error if invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'My ticket',
      price: -10,
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'My ticket',
    })
    .expect(400)
})

it('create a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({})

  expect(tickets.length).toEqual(0)

  let title = 'Ticket Title'
  let price = 20.99

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201)

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
  expect(tickets[0].price).toEqual(price)
  expect(tickets[0].title).toEqual(title)
})

it('publishes an event', async () => {
  let title = 'Ticket Title'
  let price = 20.99

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
