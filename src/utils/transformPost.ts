import { Post } from '../entities/posts/post.entity';
import { PostSchema } from '../schema/post.schema';

export function transformPost(post: Post): PostSchema {
    return {
        id: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
        title: post.title,
        description: post.description,
        tags: post.tags,
        user: {
            id: post.auth.id,
            createdAt: post.auth.createdAt,
            updatedAt: post.auth.updatedAt,
            deletedAt: post.auth.deletedAt,
            name: post.auth.name,
            email: post.auth.email,
            phone: post.auth.phone,
        },
    };
}
