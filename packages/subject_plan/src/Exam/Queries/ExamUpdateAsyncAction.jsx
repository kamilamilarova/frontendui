import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamUpdateMutation = createQueryStrLazy(
`
mutation MyMutation($id: UUID!, $lastchange: DateTime!, $minScore: Int!, $maxScore: Int!, $description: String!) {
  examUpdate(
    exam: {id: $id, lastchange: $lastchange, minScore: $minScore, maxScore: $maxScore, description: $description}
  ) {
    __typename
    ... on ExamGQLModelUpdateError {
      input
      msg
      failed
      Entity {
        id
        lastchange
        minScore
        maxScore
        description
      }
    }
    ... on ExamGQLModel {
      id
      lastchange
      minScore
      maxScore
      description
    }
  }
}
`)

export const ExamUpdateAsyncAction = createAsyncGraphQLAction(ExamUpdateMutation)