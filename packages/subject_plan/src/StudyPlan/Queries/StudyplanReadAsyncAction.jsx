import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanLargeFragment } from "./StudyplanFragments";

const StudyplanReadQuery = createQueryStrLazy(
`
query StudyplanReadQuery($id: UUID!) {
  result: studyPlanById(id: $id) {
    ...StudyplanLarge
  }
}
`, 
    StudyplanLargeFragment)

    /**
 * An async action for executing a GraphQL query to read studyplan entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `StudyplanQueryRead` query.
 * It can be dispatched with query variables to fetch data related to studyplan entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the studyplan entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(StudyplanReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const StudyplanReadAsyncAction = createAsyncGraphQLAction(StudyplanReadQuery)