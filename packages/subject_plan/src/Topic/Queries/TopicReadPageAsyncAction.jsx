import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";

const TopicReadPageQuery = createQueryStrLazy(
`
query TopicReadPageQuery($skip: Int, $limit: Int, $where: TopicWhereInputFilter) {
  result: topicPage(skip: $skip, limit: $limit, where: $where) {
    ...TopicLarge
  }
}
`, 
    TopicLargeFragment)

export const TopicReadPageAsyncAction = createAsyncGraphQLAction(TopicReadPageQuery)