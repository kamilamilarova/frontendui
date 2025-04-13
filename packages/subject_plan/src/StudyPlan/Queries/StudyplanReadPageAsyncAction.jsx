import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanLargeFragment } from "./StudyplanFragments";

const StudyplanReadPageQuery = createQueryStrLazy(
`
query StudyplanReadPageQuery($skip: Int, $limit: Int, $where: StudyplanWhereInputFilter) {
  result: studyplanPage(skip: $skip, limit: $limit, where: $where) {
    ...StudyplanLarge
  }
}
`, 
    StudyplanLargeFragment)

export const StudyplanReadPageAsyncAction = createAsyncGraphQLAction(StudyplanReadPageQuery)