import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";

const TopicInsertMutation = createQueryStrLazy(
`
mutation TopicInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: topicInsert(
    topic: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...TopicLarge
  }
}
`,
    TopicLargeFragment)


export const TopicInsertAsyncAction = createAsyncGraphQLAction(TopicInsertMutation)