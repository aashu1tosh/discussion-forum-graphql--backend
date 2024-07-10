import { Column, Entity } from 'typeorm';
import { ROLE } from '../../constant/enum';
import Base from '../base.entity';

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
}
