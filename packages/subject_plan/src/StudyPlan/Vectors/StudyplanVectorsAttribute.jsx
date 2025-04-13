import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an studyplan entity.
 *
 * This component checks if the `vectors` attribute exists on the `studyplan` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanVectorsAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array} [props.studyplan.vectors] - An array of vectors items associated with the studyplan entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <StudyplanVectorsAttribute studyplan={studyplanEntity} />
 */
export const StudyplanVectorsAttribute = ({studyplan}) => {
    const { vectors } = studyplan
    if (typeof vectors === 'undefined') return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    Probably {'<VectorMediumCard vector=\{vector\} />'} <br />
                    {JSON.stringify(vector)}
                </div>
            )}
        </>
    )
}

const StudyplanVectorsAttributeQuery = `
query StudyplanQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: studyplanById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyplanVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyplanVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const StudyplanVectorsAttributeInifite = ({studyplan}) => { 
    const {vectors} = studyplan

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudyplanVectorsAttributeAsyncAction}
        />
    )
}