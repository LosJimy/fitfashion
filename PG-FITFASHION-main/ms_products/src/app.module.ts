import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <--- Importante
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      // imprime las variables para debug
      console.log('DB_HOST:', configService.get<string>('DB_HOST'));
      console.log('DB_PORT:', configService.get<string>('DB_PORT'));
      console.log('DB_USERNAME:', configService.get<string>('DB_USERNAME'));
      console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));
      console.log('DB_NAME:', configService.get<string>('DB_NAME'));

    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: Number(configService.get<string>('DB_PORT')),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [Product],
      synchronize: true,
        };
      },
    }),
    ProductsModule,
  ],
})
export class AppModule {}