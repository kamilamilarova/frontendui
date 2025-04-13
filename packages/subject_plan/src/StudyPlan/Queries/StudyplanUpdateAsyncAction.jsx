import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanLargeFragment } from "./StudyplanFragments";

const StudyplanUpdateMutation = createQueryStrLazy(
`
mutation StudyplanUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: studyplanUpdate(
    studyplan: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StudyPlanGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudyplanLarge
      }      
    }
    ...StudyplanLarge
  }
}
`, StudyplanLargeFragment)

export const StudyplanUpdateAsyncAction = createAsyncGraphQLAction(StudyplanUpdateMutation)