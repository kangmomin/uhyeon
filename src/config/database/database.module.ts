import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "DATA_SOURCE",
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
          type: "postgres",
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_ID"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_NAME"),
          entities: [__dirname + "/../**/*.entity{.ts,.js}"],
          synchronize: true,
        });

        return dataSource.initialize();
      },
      inject: [ConfigService],
    },
  ],
  exports: ["DATA_SOURCE"],
})
export class DatabaseModule {}
