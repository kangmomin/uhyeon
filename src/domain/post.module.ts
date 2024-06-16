import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./Post";
import { PostService } from "../service/post.service";
import { PostRepository } from "../persistence/post.repository";
import { PostController } from "../controller/post.controller";
import { DatabaseModule } from "../config/database/database.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), DatabaseModule],
  providers: [PostService, PostRepository],
  controllers: [PostController],
  exports: [PostService, PostRepository],
})
export class PostModule {}
