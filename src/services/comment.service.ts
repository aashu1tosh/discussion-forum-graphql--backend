import { AppDataSource } from '../config/database.config';
import { Comment } from '../entities/comments/comment.entity';
import AppError from '../utils/appError.utils';
import {
    CommentInput,
    CommentsCommentInput,
    DeleteCommentInput,
} from '../validator/comment.validator';
import { PostService } from './posts.service';
export class CommentService {
    constructor(
        private readonly commentRepo = AppDataSource.getRepository(Comment),
        private readonly postService = new PostService()
    ) {}

    async postComment(data: CommentInput, id: string): Promise<void> {
        try {
            const validPostId = await this.postService.getById(data?.postId);
            if (validPostId) {
                const item = this.commentRepo.create(data);
                item.postId = data.postId;
                item.userId = id;
                await this.commentRepo.save(item);
            } else {
                throw AppError.badRequest(
                    'Trying to comment in an invalid post'
                );
            }
        } catch (error: any) {
            console.log(error);
            throw AppError.badRequest(error?.message);
        }
    }
    // method to post comments comments
    async postCommentsComment(
        data: CommentsCommentInput,
        id: string
    ): Promise<void> {
        try {
            const validComment = await this.getById(data?.commentId);
            if (validComment) {
                const item = this.commentRepo.create(data);
                item.parent = validComment;
                item.userId = id;
                await this.commentRepo.save(item);
            }
        } catch (error: any) {
            throw AppError.badRequest('Comment does not exits');
        }
    }

    async getById(id: string) {
        const response = await this.commentRepo.findOneBy({
            id: id,
        });
        return response;
    }

    async deleteComment(data: DeleteCommentInput, id: string): Promise<void> {
        try {
            const check = await this.getById(data.id);

            if (!check) throw AppError.badRequest("Comment doesn't Exist");

            if (check?.userId != id)
                throw AppError.forbidden(
                    'Deleting others comment is forbidden'
                );

            const response = await this.commentRepo
                .createQueryBuilder()
                .delete()
                .where('id = :id and userId= :userId', {
                    id: data.id,
                    userId: id,
                })
                .execute();
            return;
        } catch (error: any) {
            throw AppError.badRequest(error?.message);
        }
    }
}
