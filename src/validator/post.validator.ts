import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PostInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    title!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(10, 800)
    description!: string;

    @Field(() => [String])
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    tags!: [string];
}

@InputType()
export class DeletePostInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id!: string;
}
