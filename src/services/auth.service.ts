import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { Auth } from '../entities/auth/auth.entity';
import AppError from '../utils/appError.utils';
import {
    LoginInput,
    RegisterInput,
    UpdatePasswordInput,
} from '../validator/auth.validator';
import BcryptService from './bcrypt.service';
import webtokenService from './webtoken.service';

class AuthService {
    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
        private readonly bcryptService = new BcryptService(),
        private readonly webTokenGenerate = webtokenService
    ) {}

    async createUser(data: RegisterInput) {
        try {
            if (data.role === ROLE.ADMIN)
                throw AppError.badRequest('Admin creation not Authorized');

            data.role = ROLE.USER;
            const user = this.AuthRepo.create(data);
            const uniqueEmail = this.AuthRepo.findOne({
                where: { email: data?.email },
            });
            const uniquePhoneNumber = this.AuthRepo.findOne({
                where: { phone: data?.phone },
            });

            if (await uniqueEmail) {
                throw AppError.badRequest('Email already registered');
            }

            if (await uniquePhoneNumber) {
                throw AppError.badRequest('Phone number already registered');
            }
            const hash = await this.bcryptService.hash(data?.password);
            user.password = hash;
            await this.AuthRepo.save(user);
            return user;
        } catch (error: any) {
            throw AppError.badRequest(error?.message);
        }
    }

    async loginUser(data: LoginInput) {
        try {
            let user = await this.AuthRepo.findOne({
                where: { email: data?.email },
            });

            if (user) {
                if (
                    await this.bcryptService.compare(
                        data.password,
                        user.password
                    )
                ) {
                    const token = this.webTokenGenerate.sign(
                        user?.id as string
                    );
                    return { user, token };
                }
            }
            throw AppError.unauthorized('Invalid Credentials');
        } catch (error: any) {
            throw AppError.badRequest(error?.message);
        }
    }

    async updatePassword(data: UpdatePasswordInput, id: string) {
        if (data.oldPassword === data.newPassword)
            throw AppError.conflict(
                'New password should differ from old password.'
            );

        let user = await this.AuthRepo.findOne({
            where: { id: id },
        });
        if (user) {
            if (
                await this.bcryptService.compare(
                    data.oldPassword,
                    user.password
                )
            ) {
                try {
                    const password = await this.bcryptService.hash(
                        data.newPassword
                    );
                    await this.AuthRepo.createQueryBuilder()
                        .update('Auth')
                        .set({ password: password })
                        .where('id = :id', { id })
                        .execute();
                } catch (error: any) {
                    throw AppError.conflict(error?.message);
                }
            } else throw AppError.badRequest('Invalid Credential');
            return null;
        }
    }
}

export default new AuthService();
