import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";

const TopicDeleteMutation = createQueryStrLazy(
`
mutation TopicDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: topicDelete(
    topic: {id: $id, lastchange: $lastchange}
  ) {
    ... on TopicGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...TopicLarge
      }
    }
  }
}
`,
    TopicLargeFragment)

export const TopicDeleteAsyncAction = createAsyncGraphQLAction(TopicDeleteMutation)