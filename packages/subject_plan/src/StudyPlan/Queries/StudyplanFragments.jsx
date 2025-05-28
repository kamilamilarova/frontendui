import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const StudyplanLinkFragment = createQueryStrLazy(
`
fragment StudyplanLink on StudyPlanGQLModel {
  __typename
  id
  lastchange
  

  
}
`)


export const StudyplanMediumFragment = createQueryStrLazy(
`
fragment StudyplanMedium on StudyPlanGQLModel {
  
  semester {
    id
    order
    subject {
      id
      name
      program {
        id
        name
      }
    }
  }

  ...StudyplanLink
}
`, StudyplanLinkFragment)

export const StudyplanLargeFragment = createQueryStrLazy(
`
fragment StudyplanLarge on StudyPlanGQLModel {
  
  lessons {
    name
    id
    lastchange
    order
    length
    lessontypeId
    event {
      startdate
      enddate
    }
    instructors {
      id
      name
      surname
    }
    studyGroups {
      id
      name
    }
    facilities {
      id
      name
    }
    topic {
      id
      name
      description
    }
  }

  exam {
    id
    name
    minScore
    maxScore
    description
    lastchange
    evaluations {
      id
      points
      passed
      studentId
      lastchange
    }
  }
    
  ...StudyplanMedium
}
`, StudyplanMediumFragment)
  