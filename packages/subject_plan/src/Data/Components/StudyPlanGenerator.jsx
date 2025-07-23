import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

const InsertStudyPlanAsyncAction = createAsyncGraphQLAction(
    `mutation InsertStudyPlan {
  studyPlanInsert(studyPlan: {}) {
    __typename
    ...Error
    ...StudyPlan
  }
}

fragment Error on InsertError {
  __typename
  msg
  failed
  input
}

fragment StudyPlan on StudyPlanGQLModel {
  __typename
  id
  lastchange
}`)

export const StudyPlanGenerator = () => {
    const { error, loading, entity, fetch } = useAsyncAction(InsertStudyPlanAsyncAction, {}, {deferred: true})
    return (
        <div>
            Generovani studijniho planu< br/>
            <button onClick={() => fetch()}> Insert </button>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {entity && <div>Entity: {JSON.stringify(entity)}</div>}
        </div>
    )
}