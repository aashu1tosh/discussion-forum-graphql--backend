import { AppDataSource } from '../config/database.config';
import { Post } from '../entities/posts/post.entity';
import AppError from '../utils/appError.utils';
import { DeletePostInput, PostInput } from '../validator/post.validator';

export class PostService {
    constructor(
        private readonly postRepo = AppDataSource.getRepository(Post)
    ) {}

    async postDiscussion(data: PostInput, id: string) {
        const item = this.postRepo.create(data);
        item.user_id = id;
        await this.postRepo.save(item);
        return;
    }
    async getAll() {
        try {
            const posts = await this.postRepo
                .createQueryBuilder('post')
                .leftJoinAndSelect('post.auth', 'auth')
                .getMany();

            return posts;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id: string) {
        const response = await this.postRepo
            .createQueryBuilder()
            .select()
            .where('id = :id', { id: id })
            .getOne();

        return response;
    }

    async deletePost(data: DeletePostInput, id: string): Promise<void> {
        const check = await this.getById(data.id);

        if (!check) throw AppError.badRequest("Post doesn't Exist");

        if (check?.user_id != id)
            throw AppError.forbidden('Deleting others post is forbidden');

        const response = await this.postRepo
            .createQueryBuilder()
            .delete()
            .where('id = :id and user_id= :userId', { id: data.id, userId: id })
            .execute();
        return;
    }
}
