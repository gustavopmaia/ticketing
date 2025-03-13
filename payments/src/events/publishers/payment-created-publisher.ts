import { PaymentCreatedEvent, Publisher, Subjects } from '@gmtickets11/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
