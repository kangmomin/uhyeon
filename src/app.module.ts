import { Module } from "@nestjs/common";
import { DatabaseModule } from "./config/database/database.module";
import { PostController } from "./controller/post.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [],
})
export class AppModule {}
