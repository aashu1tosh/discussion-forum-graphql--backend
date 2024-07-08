import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { Auth } from '../entities/auth/auth.entity';
import AppError from '../utils/appError.utils';
import {
    LoginInput,
    RegisterFields,
    UpdatePasswordInput,
} from '../validator/auth.validator';
import BcryptService from './bcrypt.service';
import webtokenService from './webtoken.service';

class AuthService {
    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
        private readonly bcryptService = new BcryptService(),
        private readonly webTokenGenerate = webtokenService
    ) { }

    async createUser(data: RegisterFields) {
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
        try {
            let user = await this.AuthRepo.findOne({
                where: { id: id },
            });

            if (user) {
                const isPasswordMatched = await this.bcryptService.compare(data?.oldPassword, user?.password);
                if (!isPasswordMatched) throw AppError.badRequest("password not matched")
                else {
                    const password = await this.bcryptService.hash(
                        data.newPassword
                    );
                    user.password = password;
                    await user.save();
                }
            }
        } catch (error: any) {
            console.log(error)
            throw AppError.badRequest(error?.message)
        }
    }
}

export default new AuthService();
