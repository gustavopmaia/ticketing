import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@gmtickets11/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
