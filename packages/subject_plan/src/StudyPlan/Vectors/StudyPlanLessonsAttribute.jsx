import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `lessons` attribute of an studyplan entity.
 *
 * This component checks if the `lessons` attribute exists on the `studyplan` object. If `lessons` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `lessons` array and
 * displays a placeholder message and a JSON representation for each item in the `lessons`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanLessonsAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array} [props.studyplan.lessons] - An array of lessons items associated with the studyplan entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `lessons` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { 
 *   lessons: [
 *     { id: 1, name: "Lesson Item 1" }, 
 *     { id: 2, name: "Lesson Item 2" }
 *   ] 
 * };
 *
 * <StudyplanLessonsAttribute studyplan={studyplanEntity} />
 */
export const StudyplanLessonsAttribute = ({studyplan}) => {
    const { lessons } = studyplan
    if (typeof lessons === 'undefined') return null
    return (
        <>
            {lessons.map(
                lesson => <div id={lesson.id} key={lesson.id}>
                    Probably {'<LessonMediumCard lesson=\{lesson\} />'} <br />
                    {JSON.stringify(lesson)}
                </div>
            )}
        </>
    )
}

const StudyplanLessonsAttributeQuery = `
query StudyplanQueryRead($id: id, $where: LessonInputFilter, $skip: Int, $limit: Int) {
    result: studyplanById(id: $id) {
        __typename
        id
        lessons(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyplanLessonsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyplanLessonsAttributeQuery,
    processVectorAttributeFromGraphQLResult("lessons")
)

export const StudyplanLessonsAttributeInifite = ({studyplan}) => { 
    const {lessons} = studyplan

    return (
        <InfiniteScroll 
            Visualiser={'LessonMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudyplanLessonsAttributeAsyncAction}
        />
    )
}