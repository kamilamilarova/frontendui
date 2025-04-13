import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanLargeFragment } from "./StudyplanFragments";

const StudyplanDeleteMutation = createQueryStrLazy(
`
mutation StudyplanDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studyplanDelete(
    studyplan: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudyPlanGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudyplanLarge
      }
    }
  }
}
`,
    StudyplanLargeFragment)

export const StudyplanDeleteAsyncAction = createAsyncGraphQLAction(StudyplanDeleteMutation)