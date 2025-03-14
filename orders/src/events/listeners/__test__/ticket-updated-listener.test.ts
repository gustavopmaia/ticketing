import { TicketUpdatedEvent } from '@gmtickets11/common'
import { Ticket } from '../../../models/ticket'
import { natsWrapper } from '../../../nats-wrapper'
import { TicketUpdatedListener } from '../ticket-updated-listener'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client)

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  })
  await ticket.save()

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'test',
    price: 12,
    userId: new mongoose.Types.ObjectId().toHexString(),
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { msg, data, listener, ticket }
}

it('find updates and saves a ticket', async () => {
  const { msg, data, listener, ticket } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title)
  expect(updatedTicket!.price).toEqual(data.price)
  expect(updatedTicket!.version).toEqual(data.version)
})

it('acks the message', async () => {
  const { msg, data, listener, ticket } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if event is in "future"', async () => {
  const { msg, data, listener, ticket } = await setup()

  data.version = 10
  try {
    await listener.onMessage(data, msg)
  } catch (e) {}
  expect(msg.ack).not.toHaveBeenCalled()
})
