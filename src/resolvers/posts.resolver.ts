import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import { RequestValidator } from '../middleware/RequestValidator';
import { authentication } from '../middleware/authentication.middleware';
import { PostService } from '../services/posts.service';
import { IContext } from '../types/context.type';
import { DeletePostInput, PostInput } from '../validator/post.validator';

@Resolver()
export class PostResolver {
    constructor(private readonly postService = new PostService()) {}

    @Query(() => String)
    async getPosts() {
        return 'Hello from getPosts';
    }

    @Mutation(() => String)
    @UseMiddleware(RequestValidator.validate(PostInput))
    @UseMiddleware(authentication())
    async postDiscussion(
        @Arg('data') data: PostInput,
        @Ctx() context: IContext
    ): Promise<string> {
        const id = context.res.locals.id;
        await this.postService.postDiscussion(data, id);
        return 'Discussion Post Successful';
    }

    @Mutation(() => String)
    @UseMiddleware(RequestValidator.validate(DeletePostInput))
    @UseMiddleware(authentication())
    async deletePost(
        @Arg('data') data: DeletePostInput,
        @Ctx() context: IContext
    ): Promise<string> {
        const id = context.res.locals.id;
        await this.postService.deletePost(data, id);
        return 'Post Deletion Successful';
    }
}
