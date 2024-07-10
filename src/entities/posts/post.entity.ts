import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Base from '../base.entity';
import { Auth } from '../auth/auth.entity';

@Entity('Post')
export class Post extends Base {
    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column('text', { array: true, nullable: true })
    tags!: string[];

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'userId' }) // Specifies the name of the foreign key column
    auth!: Auth;

    @Column()
    userId!: string; // Foreign key column
}
