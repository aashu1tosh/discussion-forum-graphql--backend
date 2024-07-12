import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { RequestValidator } from '../middleware/RequestValidator';
import { authentication } from '../middleware/authentication.middleware';
import { CommentService } from '../services/comment.service';
import { IContext } from '../types/context.type';
import {
    CommentInput,
    DeleteCommentInput,
} from '../validator/comment.validator';
import { DeletePostInput } from '../validator/post.validator';

@Resolver()
export class CommentResolver {
    constructor(private readonly commentService = new CommentService()) {}

    // @Query(() => String)
    // async getComment() {
    //     return 'Sending Comments';
    // }

    @Mutation(() => String)
    @UseMiddleware(RequestValidator.validate(CommentInput))
    @UseMiddleware(authentication())
    async postComment(
        @Arg('data') data: CommentInput,
        @Ctx() context: IContext
    ) {
        const id = context?.res?.locals?.id;
        await this.commentService.postComment(data, id);
        return 'successful';
    }

    @Mutation(() => String)
    @UseMiddleware(RequestValidator.validate(DeleteCommentInput))
    @UseMiddleware(authentication())
    async deleteComment(
        @Arg('data') data: DeletePostInput,
        @Ctx() context: IContext
    ): Promise<string> {
        const id = context?.res?.locals?.id;
        await this.commentService.deleteComment(data, id);
        return 'Comment Deletion Successful';
    }
}
