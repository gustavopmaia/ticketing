import { Publisher, OrderCancelledEvent, Subjects } from '@gmtickets11/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
