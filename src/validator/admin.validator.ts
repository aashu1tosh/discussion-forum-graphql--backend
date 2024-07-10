import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class IdInput {
    @Field()
    @IsNotEmpty()
    id!: string;
}
