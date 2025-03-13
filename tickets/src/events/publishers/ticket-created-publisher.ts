import { Publisher, Subjects, TicketCreatedEvent } from '@gmtickets11/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
