import { Inject, Injectable } from "@nestjs/common";
import { Post } from "../domain/Post";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PostRepository {
  private repository: Repository<Post>;

  constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Post);
  }

  writePost(title: string, description: string) {
    const post = new Post();

    post.title = title;
    post.description = description;

    return this.repository.create(post).id;
  }

  getPosts() {
    return this.repository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  deletePost(postId: number) {
    return this.repository.delete(postId);
  }

  async updatePost(postId: number, title: string, description: string) {
    const post: Post = {
      id: postId,
      title: title,
      description: description,
      createdAt: null,
      updatedAt: null,
    };

    await this.repository.update(postId, post);
  }
}
