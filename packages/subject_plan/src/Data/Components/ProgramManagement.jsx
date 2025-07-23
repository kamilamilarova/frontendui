import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"

const InsertProgramAsyncAction = createAsyncGraphQLAction(
    `mutation InsertProgram($name: String!) {
        programInsert(program: { name: $name }) {
          __typename
          ...on InsertError {
            failed
            msg
            input
          }
          ...ProgramMedium
        }
      }
      
      fragment ProgramMedium on ProgramGQLModel {
        id
        name
      }`
    )

export const ProgramManagement = () => {
    const { error, loading, entity, fetch } = useAsyncAction(InsertProgramAsyncAction, { name: "test" }, {deferred: true})
    return (
        <div>
            Generovani dat pro program< br/>
            <button onClick={() => fetch({name: "Test"})}> Insert </button>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {entity && <div>Entity: {JSON.stringify(entity)}</div>}

        </div>
    )
}