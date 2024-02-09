import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri:`mongodb+srv://${config.get<string>('MONGO.USER')}:${config.get<string>('MONGO.PASSWORD')}@pruebastecnicas.sm4lf1d.mongodb.net/${config.get<string>('MONGO.DATABASE')}?retryWrites=true&w=majority`
      }),
    }),
    MongooseModule.forRoot(`mongodb+srv://${'jsburbano'}:${'EmpanadasConAji123'}@pruebastecnicas.sm4lf1d.mongodb.net/${'TaskManagerStorage'}?retryWrites=true&w=majority`),
    NotesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}