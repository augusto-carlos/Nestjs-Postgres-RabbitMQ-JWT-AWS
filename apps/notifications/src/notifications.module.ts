import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TCP_PORT: Joi.number(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string(),
        GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string(),
        SMTP_USER: Joi.string(),
      }),
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
