import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const StudyplanlessonLinkFragment = createQueryStrLazy(
`
fragment StudyplanlessonLink on StudyplanlessonGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const StudyplanlessonMediumFragment = createQueryStrLazy(
`
fragment StudyplanlessonMedium on StudyplanlessonGQLModel {
  ...StudyplanlessonLink
}
`, StudyplanlessonLinkFragment)

export const StudyplanlessonLargeFragment = createQueryStrLazy(
`
fragment StudyplanlessonLarge on StudyplanlessonGQLModel {
  ...StudyplanlessonMedium
}
`, StudyplanlessonMediumFragment)
  