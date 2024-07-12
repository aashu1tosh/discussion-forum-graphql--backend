import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from '../auth/auth.entity';
import Base from '../base.entity';

@Entity('Comments')
export class Post extends Base {
    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column('text', { array: true, nullable: true })
    tags!: string[];

    @ManyToOne(() => Auth, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    auth!: Auth;

    @Column()
    user_id!: string;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'postId' })
    post!: Post;

    @Column()
    postId!: string;
}
