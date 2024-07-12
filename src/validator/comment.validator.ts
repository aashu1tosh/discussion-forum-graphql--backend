import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    postId!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    comment!: string;
}

@InputType()
export class DeleteCommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id!: string;
}
