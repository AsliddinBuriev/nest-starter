import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from './configs';
import { LoggerMiddleware } from './common/middlewares';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatter } from './common/interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../env', `app.env`),
      load: [appConfigs],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
