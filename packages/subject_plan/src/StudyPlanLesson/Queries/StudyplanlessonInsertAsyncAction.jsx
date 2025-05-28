import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanlessonLargeFragment } from "./StudyplanlessonFragments";

const StudyplanlessonInsertMutation = createQueryStrLazy(
`
mutation StudyplanlessonInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: studyplanlessonInsert(
    studyplanlesson: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudyplanlessonLarge
  }
}
`,
    StudyplanlessonLargeFragment)


export const StudyplanlessonInsertAsyncAction = createAsyncGraphQLAction(StudyplanlessonInsertMutation)