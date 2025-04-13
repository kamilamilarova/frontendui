import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanLargeFragment } from "./StudyplanFragments";

const StudyplanInsertMutation = createQueryStrLazy(
`
mutation StudyplanInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: studyplanInsert(
    studyplan: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudyplanLarge
  }
}
`,
    StudyplanLargeFragment)


export const StudyplanInsertAsyncAction = createAsyncGraphQLAction(StudyplanInsertMutation)