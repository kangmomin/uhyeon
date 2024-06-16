import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { PostService } from "../service/post.service";
import { CreatePostRequest } from "./request/CreatePostRequest";
import { UpdatePostRequest } from "./request/UpdatePostRequest";

@Controller()
export class PostController {
  constructor(
    @Inject()
    private readonly postService: PostService,
  ) {}

  @Post("/post")
  async create(@Body() createPostRequest: CreatePostRequest) {
    const postId = this.postService.writePost(createPostRequest);

    return { status: "success", postId };
  }

  @Get("/post")
  async read() {
    return {
      status: "success",
      data: await this.postService.getPosts(),
    };
  }

  @Put("/post")
  async update(@Body() updatePostRequest: UpdatePostRequest) {
    await this.postService.updatePosts(updatePostRequest);

    return {
      status: "success",
    };
  }

  @Delete("/post/:id")
  async delete(@Param("id") postId: number) {
    await this.postService.deletePost(postId);

    return {
      status: "success",
    };
  }
}
