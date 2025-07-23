import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"

const InsertSubjectAsyncAction = createAsyncGraphQLAction(
    `mutation InsertSubject($name: String!) {
        subjectInsert(subject: { name: $name }) {
          __typename
          ...on InsertError {
            failed
            msg
            input
          }
          ...SubjectMedium
        }
      }
      
      fragment SubjectMedium on SubjectGQLModel {
        id
        name
      }`
    )

export const SubjectManagement = () => {
    const { error, loading, entity, fetch } = useAsyncAction(InsertSubjectAsyncAction, { name: "test" }, {deferred: true})
    return (
        <div>
            Generovani dat pro předmět< br/>
            <button onClick={() => fetch({name: "Test"})}> Insert </button>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {entity && <div>Entity: {JSON.stringify(entity)}</div>}

        </div>
    )
}