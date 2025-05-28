import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const TopicLinkFragment = createQueryStrLazy(
`
fragment TopicLink on TopicGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const TopicMediumFragment = createQueryStrLazy(
`
fragment TopicMedium on TopicGQLModel {
  ...TopicLink
}
`, TopicLinkFragment)

export const TopicLargeFragment = createQueryStrLazy(
`
fragment TopicLarge on TopicGQLModel {
  ...TopicMedium
}
`, TopicMediumFragment)
  