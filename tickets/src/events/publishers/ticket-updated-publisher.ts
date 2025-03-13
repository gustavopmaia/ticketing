import { Publisher, Subjects, TicketUpdatedEvent } from '@gmtickets11/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
