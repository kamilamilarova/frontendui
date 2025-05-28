import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `instructors` attribute of an studyplan entity.
 *
 * This component checks if the `instructors` attribute exists on the `studyplan` object. If `instructors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `instructors` array and
 * displays a placeholder message and a JSON representation for each item in the `instructors`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanInstructorsAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array} [props.studyplan.instructors] - An array of instructors items associated with the studyplan entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `instructors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { 
 *   instructors: [
 *     { id: 1, name: "Instructor Item 1" }, 
 *     { id: 2, name: "Instructor Item 2" }
 *   ] 
 * };
 *
 * <StudyplanInstructorsAttribute studyplan={studyplanEntity} />
 */
export const StudyplanInstructorsAttribute = ({studyplan}) => {
    const { instructors } = studyplan
    if (typeof instructors === 'undefined') return null
    return (
        <>
            {instructors.map(
                instructor => <div id={instructor.id} key={instructor.id}>
                    Probably {'<InstructorMediumCard instructor=\{instructor\} />'} <br />
                    {JSON.stringify(instructor)}
                </div>
            )}
        </>
    )
}

const StudyplanInstructorsAttributeQuery = `
query StudyplanQueryRead($id: id, $where: InstructorInputFilter, $skip: Int, $limit: Int) {
    result: studyplanById(id: $id) {
        __typename
        id
        instructors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyplanInstructorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyplanInstructorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("instructors")
)

export const StudyplanInstructorsAttributeInifite = ({studyplan}) => { 
    const {instructors} = studyplan

    return (
        <InfiniteScroll 
            Visualiser={'InstructorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudyplanInstructorsAttributeAsyncAction}
        />
    )
}