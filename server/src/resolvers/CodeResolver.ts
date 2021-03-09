import { CodePost } from "../entity/Code";
import { Arg, Int, Query } from "type-graphql";

export class CodeResolver {

  @Query(() => CodePost)
   execute(
      @Arg("source_code", () => String) source_code: string,
      @Arg("language_id", () => Int) language_id: number,
  ) {
    // const response = await fetch("http://35.205.20.238/submissions")
     //const data = await response.json()
      return true
  }
}