import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanlessonLargeFragment } from "./StudyplanlessonFragments";

const StudyplanlessonDeleteMutation = createQueryStrLazy(
`
mutation StudyplanlessonDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studyplanlessonDelete(
    studyplanlesson: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudyplanlessonGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudyplanlessonLarge
      }
    }
  }
}
`,
    StudyplanlessonLargeFragment)

export const StudyplanlessonDeleteAsyncAction = createAsyncGraphQLAction(StudyplanlessonDeleteMutation)