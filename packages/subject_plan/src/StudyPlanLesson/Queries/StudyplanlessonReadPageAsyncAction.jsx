import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanlessonLargeFragment } from "./StudyplanlessonFragments";

const StudyplanlessonReadPageQuery = createQueryStrLazy(
`
query StudyplanlessonReadPageQuery($skip: Int, $limit: Int, $where: StudyplanlessonWhereInputFilter) {
  result: studyplanlessonPage(skip: $skip, limit: $limit, where: $where) {
    ...StudyplanlessonLarge
  }
}
`, 
    StudyplanlessonLargeFragment)

export const StudyplanlessonReadPageAsyncAction = createAsyncGraphQLAction(StudyplanlessonReadPageQuery)