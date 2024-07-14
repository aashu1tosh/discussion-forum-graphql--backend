import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Auth } from '../auth/auth.entity';
import Base from '../base.entity';
import { Comment } from '../comments/comment.entity';

@Entity('Post')
export class Post extends Base {
    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column('text', { array: true, nullable: true })
    tags!: string[];

    @ManyToOne(() => Auth, (auth) => auth.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    auth!: Auth;

    @Column({ name: 'user_id' })
    userId!: string; // Foreign key column

    @OneToMany(() => Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    })
    comments!: Comment[];
}
