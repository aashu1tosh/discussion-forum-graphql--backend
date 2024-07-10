import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { ROLE } from '../constant/enum';
import { RequestValidator } from '../middleware/RequestValidator';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';
import { UserSchema } from '../schema/user.schema';
import { AdminService } from '../services/admin.service';
import { IdInput } from '../validator/admin.validator';

@Resolver()
export class AdminResolver {
    constructor(private readonly adminService = new AdminService()) {}

    @Query(() => [UserSchema])
    @UseMiddleware(authentication())
    @UseMiddleware(authorization([ROLE.ADMIN]))
    async getUsers() {
        return this.adminService.getUsers();
    }

    @Mutation(() => String)
    @UseMiddleware(RequestValidator.validate(IdInput))
    async deleteUser(@Arg('data') data: IdInput): Promise<string> {
        const response = await this.adminService.deleteUser(data.id as string);
        return 'User Deletion Successful';
    }
}
