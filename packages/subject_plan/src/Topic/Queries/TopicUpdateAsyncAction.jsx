import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";

const TopicUpdateMutation = createQueryStrLazy(
`
mutation TopicUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: topicUpdate(
    topic: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on TopicGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...TopicLarge
      }      
    }
    ...TopicLarge
  }
}
`, TopicLargeFragment)

export const TopicUpdateAsyncAction = createAsyncGraphQLAction(TopicUpdateMutation)