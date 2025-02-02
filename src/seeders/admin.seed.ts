import { AppDataSource } from '../config/database.config';
import { admins } from '../constant/admin';
import { Auth } from '../entities/auth/auth.entity';
import { IUser } from '../interface/user.interface';
import BcryptService from '../services/bcrypt.service';
import Print from '../utils/Print';

async function seedAdmin(data: IUser) {
    try {
        await AppDataSource.initialize();
        const authRepo = AppDataSource.getRepository(Auth);
        const bcrpytService = new BcryptService();

        const existingAdmin = await authRepo
            .createQueryBuilder('auth')
            .where('auth.email = :email', { email: data.email })
            .orWhere('auth.phone = :phone', { phone: data.phone })
            .getOne();

        if (existingAdmin) {
            Print.error('Phone or email must be unique.');
        }

        const user = authRepo.create(data);
        const hash = await bcrpytService.hash(data?.password);
        user.password = hash;
        await authRepo.save(user);
        Print.info(`${data?.email} seeded successfully`);
    } catch (error) {
        Print.error(`Seeding Admin Failed`);
        console.error(error);
    } finally {
        process.exit(0);
    }
}

const args = process.argv[2];
if (!args) {
    console.error('Please provide an argument');
    process.exit(1);
}

if (args === 'seed') {
    void seedAdmin(admins);
} else {
    console.error('Invalid argument');
    process.exit(1);
}
