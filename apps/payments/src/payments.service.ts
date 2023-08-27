import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import {
  NOTIFICATIONS_SERVICE,
  NotifyEmailDto,
  PaymentsCreateChargeDto,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  async createChange({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      receipt_email: email,
      return_url: 'http://localhost:3000/reservations',
    });

    this.notificationsService.emit<string, NotifyEmailDto>('notify_email', {
      email,
      subject: 'Payment Success',
      text: `Your payment of $${amount} has completed successfully.`,
    });

    return paymentIntent;
  }
}
