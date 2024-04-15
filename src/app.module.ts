import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as cors from 'cors';
import { NoticiasModule } from './noticias/noticias.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EdicoesModule } from './edicoes/edicoes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images', 
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'pdf'),
      serveRoot: '/pdf', 
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`]
    }), 
    AuthModule,
    UsersModule,
    NoticiasModule,
    EdicoesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
