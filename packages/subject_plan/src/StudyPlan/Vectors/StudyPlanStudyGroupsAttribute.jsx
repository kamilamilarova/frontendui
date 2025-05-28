import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `studygroups` attribute of an studyplan entity.
 *
 * This component checks if the `studygroups` attribute exists on the `studyplan` object. If `studygroups` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `studygroups` array and
 * displays a placeholder message and a JSON representation for each item in the `studygroups`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanStudygroupsAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array} [props.studyplan.studygroups] - An array of studygroups items associated with the studyplan entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `studygroups` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { 
 *   studygroups: [
 *     { id: 1, name: "Studygroup Item 1" }, 
 *     { id: 2, name: "Studygroup Item 2" }
 *   ] 
 * };
 *
 * <StudyplanStudygroupsAttribute studyplan={studyplanEntity} />
 */
export const StudyplanStudygroupsAttribute = ({studyplan}) => {
    const { studygroups } = studyplan
    if (typeof studygroups === 'undefined') return null
    return (
        <>
            {studygroups.map(
                studygroup => <div id={studygroup.id} key={studygroup.id}>
                    Probably {'<StudygroupMediumCard studygroup=\{studygroup\} />'} <br />
                    {JSON.stringify(studygroup)}
                </div>
            )}
        </>
    )
}

const StudyplanStudygroupsAttributeQuery = `
query StudyplanQueryRead($id: id, $where: StudygroupInputFilter, $skip: Int, $limit: Int) {
    result: studyplanById(id: $id) {
        __typename
        id
        studygroups(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyplanStudygroupsAttributeAsyncAction = createAsyncGraphQLAction(
    StudyplanStudygroupsAttributeQuery,
    processVectorAttributeFromGraphQLResult("studygroups")
)

export const StudyplanStudygroupsAttributeInifite = ({studyplan}) => { 
    const {studygroups} = studyplan

    return (
        <InfiniteScroll 
            Visualiser={'StudygroupMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudyplanStudygroupsAttributeAsyncAction}
        />
    )
}