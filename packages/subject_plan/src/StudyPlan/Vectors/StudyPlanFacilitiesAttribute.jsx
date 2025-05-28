import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `facilities` attribute of an studyplan entity.
 *
 * This component checks if the `facilities` attribute exists on the `studyplan` object. If `facilities` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `facilities` array and
 * displays a placeholder message and a JSON representation for each item in the `facilities`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanFacilitiesAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array} [props.studyplan.facilities] - An array of facilities items associated with the studyplan entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `facilities` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { 
 *   facilities: [
 *     { id: 1, name: "Facilitie Item 1" }, 
 *     { id: 2, name: "Facilitie Item 2" }
 *   ] 
 * };
 *
 * <StudyplanFacilitiesAttribute studyplan={studyplanEntity} />
 */
export const StudyplanFacilitiesAttribute = ({studyplan}) => {
    const { facilities } = studyplan
    if (typeof facilities === 'undefined') return null
    return (
        <>
            {facilities.map(
                facilitie => <div id={facilitie.id} key={facilitie.id}>
                    Probably {'<FacilitieMediumCard facilitie=\{facilitie\} />'} <br />
                    {JSON.stringify(facilitie)}
                </div>
            )}
        </>
    )
}

const StudyplanFacilitiesAttributeQuery = `
query StudyplanQueryRead($id: id, $where: FacilitieInputFilter, $skip: Int, $limit: Int) {
    result: studyplanById(id: $id) {
        __typename
        id
        facilities(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudyplanFacilitiesAttributeAsyncAction = createAsyncGraphQLAction(
    StudyplanFacilitiesAttributeQuery,
    processVectorAttributeFromGraphQLResult("facilities")
)

export const StudyplanFacilitiesAttributeInifite = ({studyplan}) => { 
    const {facilities} = studyplan

    return (
        <InfiniteScroll 
            Visualiser={'FacilitieMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudyplanFacilitiesAttributeAsyncAction}
        />
    )
}