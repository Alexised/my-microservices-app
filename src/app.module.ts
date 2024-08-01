import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module'; // Asegúrate de importar el módulo de la base de datos

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto asegura que ConfigModule esté disponible globalmente en tu aplicación
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
