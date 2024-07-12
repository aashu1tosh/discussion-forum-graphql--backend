import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from '../auth/auth.entity';
import Base from '../base.entity';
import { Post } from '../posts/post.entity';

@Entity('Comment')
export class Comment extends Base {

    @Column()
    comment!: string;

    @ManyToOne(() => Auth, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    auth!: Auth;

    @Column()
    user_id!: string;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @Column()
    post_id!: string;
}
