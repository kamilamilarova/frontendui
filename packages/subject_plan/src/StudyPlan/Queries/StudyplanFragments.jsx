import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const StudyplanLinkFragment = createQueryStrLazy(
`
fragment StudyplanLink on StudyPlanGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const StudyplanMediumFragment = createQueryStrLazy(
`
fragment StudyplanMedium on StudyPlanGQLModel {
  ...StudyplanLink
}
`, StudyplanLinkFragment)

export const StudyplanLargeFragment = createQueryStrLazy(
`
fragment StudyplanLarge on StudyPlanGQLModel {
  ...StudyplanMedium
}
`, StudyplanMediumFragment)
  