import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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

    @Column({ name: 'user_id' })
    userId!: string;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @Column({ name: 'post_id', nullable: true })
    postId!: string;

    @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
    parent!: Comment

    @OneToMany(() => Comment, (comment) => comment.parent, { nullable: true })
    children!: Comment[]
}
