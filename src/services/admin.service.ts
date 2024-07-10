import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { Auth } from '../entities/auth/auth.entity';
import AppError from '../utils/appError.utils';
import BcryptService from './bcrypt.service';

export class AdminService {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly bcryptService = new BcryptService()
    ) {}

    async getUsers() {
        const auths = await this.authRepo.find();
        return auths;
    }

    async getById(id: string) {
        return await this.authRepo
            .createQueryBuilder('auth')
            .select([
                'auth.id',
                'auth.name',
                'auth.email',
                'auth.phone',
                'auth.role',
            ])
            .where('id = :id', { id: id })
            .getOne();
    }

    async resetPassword(data: { newPassword: string; id: string }) {
        const hash = await this.bcryptService.hash(data?.newPassword);
        const response = await this.authRepo
            .createQueryBuilder()
            .update(Auth)
            .set({
                password: hash,
            })
            .where('id = :id', { id: data.id })
            .execute();
        return response;
    }

    async deleteUser(id: string) {
        const user = await this.getById(id);
        if (user?.role === ROLE.ADMIN)
            throw AppError.forbidden('Admin cannot be deleted.');
        await this.authRepo
            .createQueryBuilder()
            .delete()
            .from(Auth)
            .where('id = :id', { id: id })
            .execute();
        return null;
    }
}
