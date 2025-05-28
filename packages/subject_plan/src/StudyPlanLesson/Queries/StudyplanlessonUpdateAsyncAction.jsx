import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanlessonLargeFragment } from "./StudyplanlessonFragments";

const StudyplanlessonUpdateMutation = createQueryStrLazy(
`
mutation StudyplanlessonUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: studyplanlessonUpdate(
    studyplanlesson: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StudyplanlessonGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudyplanlessonLarge
      }      
    }
    ...StudyplanlessonLarge
  }
}
`, StudyplanlessonLargeFragment)

export const StudyplanlessonUpdateAsyncAction = createAsyncGraphQLAction(StudyplanlessonUpdateMutation)