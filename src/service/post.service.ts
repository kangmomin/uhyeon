import { Inject, Injectable } from "@nestjs/common";
import { PostRepository } from "../persistence/post.repository";
import { CreatePostRequest } from "../controller/request/CreatePostRequest";
import { UpdatePostRequest } from "../controller/request/UpdatePostRequest";

@Injectable()
export class PostService {
  constructor(@Inject() private postRepository: PostRepository) {}

  getPosts() {
    return this.postRepository.getPosts();
  }

  async updatePosts(updatePostRequest: UpdatePostRequest) {
    await this.postRepository.updatePost(
      updatePostRequest.postId,
      updatePostRequest.title,
      updatePostRequest.description,
    );
  }

  async deletePost(postId: number) {
    await this.postRepository.deletePost(postId);
  }

  writePost(createPostRequest: CreatePostRequest) {
    return this.postRepository.writePost(
      createPostRequest.title,
      createPostRequest.description,
    );
  }
}
