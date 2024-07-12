import { AppDataSource } from '../config/database.config';
import { Comment } from '../entities/comments/comment.entity';
import AppError from '../utils/appError.utils';
import { CommentInput, DeleteCommentInput } from '../validator/comment.validator';
import { PostService } from './posts.service';
export class CommentService {
    constructor(
        private readonly commentRepo = AppDataSource.getRepository(Comment),
        private readonly postService = new PostService()
    ) { }

    async postComment(data: CommentInput, id: string): Promise<void> {
        try {
            const validPostId = await this.postService.getById(data?.postId);
            if (validPostId) {
                const item = this.commentRepo.create(data);
                item.post_id = data.postId;
                item.user_id = id;
                await this.commentRepo.save(item);
            } else {
                throw AppError.badRequest("Trying to comment in an invalid post")
            }
        } catch (error) {
            throw AppError.internalServerError("Some went south")
        }
    }


    async deleteComment(data: DeleteCommentInput, id: string): Promise<void> {

    }
}
