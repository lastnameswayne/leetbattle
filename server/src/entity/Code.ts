import { ObjectType } from "type-graphql";

@ObjectType()
export class CodePost {
    source_code: String;
    language_id: Number;
}