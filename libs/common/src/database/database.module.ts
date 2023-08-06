import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(documents: any[]) {
    return MongooseModule.forFeature(
      documents.map((doc) => ({
        name: doc.collectionName,
        schema: SchemaFactory.createForClass(doc),
      })),
    );
  }
}
