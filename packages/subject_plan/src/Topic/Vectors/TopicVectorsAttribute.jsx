import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an topic entity.
 *
 * This component checks if the `vectors` attribute exists on the `topic` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the TopicVectorsAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {Array} [props.topic.vectors] - An array of vectors items associated with the topic entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const topicEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <TopicVectorsAttribute topic={topicEntity} />
 */
export const TopicVectorsAttribute = ({topic}) => {
    const { vectors } = topic
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

const TopicVectorsAttributeQuery = `
query TopicQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: topicById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const TopicVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    TopicVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const TopicVectorsAttributeInfinite = ({topic}) => { 
    const {vectors} = topic

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={TopicVectorsAttributeAsyncAction}
        />
    )
}