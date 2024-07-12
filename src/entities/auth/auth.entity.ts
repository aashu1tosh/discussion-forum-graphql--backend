import { Column, Entity, OneToMany } from 'typeorm';
import { ROLE } from '../../constant/enum';
import Base from '../base.entity';
import { Post } from '../posts/post.entity';

@Entity('Auth')
export class Auth extends Base {
    @Column()
    name!: string;

    @Column({
        unique: true,
    })
    email!: string;

    @Column({
        select: false,
    })
    password!: string;

    @Column({
        unique: true,
    })
    phone!: string;

    @Column({
        type: 'enum',
        enum: ROLE,
    })
    role!: ROLE;

    @OneToMany(() => Post, (post) => post.auth)
    posts!: Post[];
}
