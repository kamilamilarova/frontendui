import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an studyplanlesson entity.
 *
 * This component checks if the `vectors` attribute exists on the `studyplanlesson` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanlessonVectorsAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {Array} [props.studyplanlesson.vectors] - An array of vectors items associated with the studyplanlesson entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <StudyplanlessonVectorsAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyplanlessonVectorsAttribute = ({studyplanlesson}) => {
    const { vectors } = studyplanlesson
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

const StudyplanlessonVectorsAttributeQuery = `
query StudyplanlessonQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: studyplanlessonById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyplanlessonVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyplanlessonVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const StudyplanlessonVectorsAttributeInfinite = ({studyplanlesson}) => { 
    const {vectors} = studyplanlesson

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudyplanlessonVectorsAttributeAsyncAction}
        />
    )
}