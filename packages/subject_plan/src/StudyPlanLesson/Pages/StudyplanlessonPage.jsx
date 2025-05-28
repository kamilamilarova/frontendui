import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudyplanlessonLargeCard } from "../Components"
import { StudyplanlessonReadAsyncAction } from "../Queries"
import { StudyplanlessonPageNavbar } from "./StudyplanlessonPageNavbar"

/**
 * A page content component for displaying detailed information about an studyplanlesson entity.
 *
 * This component utilizes `StudyplanlessonLargeCard` to create a structured layout and displays 
 * the serialized representation of the `studyplanlesson` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the StudyplanlessonPageContent component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The name or label of the studyplanlesson entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an studyplanlesson entity.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyplanlessonPageContent studyplanlesson={studyplanlessonEntity} />
 */
const StudyplanlessonPageContent = ({studyplanlesson}) => {
    return (<>
        <StudyplanlessonPageNavbar studyplanlesson={studyplanlesson} />
        <StudyplanlessonLargeCard studyplanlesson={studyplanlesson}>
            Studyplanlesson {JSON.stringify(studyplanlesson)}
        </StudyplanlessonLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an studyplanlesson entity.
 *
 * This component is created using `createLazyComponent` and wraps `StudyplanlessonPageContent` to provide
 * automatic data fetching for the `studyplanlesson` entity. It uses the `StudyplanlessonReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `studyplanlesson` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.studyplanlesson - The identifier of the studyplanlesson entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `studyplanlesson` entity data and displays it
 * using `StudyplanlessonPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const studyplanlessonId = "12345";
 *
 * <StudyplanlessonPageContentLazy studyplanlesson={studyplanlessonId} />
 */
const StudyplanlessonPageContentLazy = ({studyplanlesson}) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudyplanlessonReadAsyncAction, studyplanlesson)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <StudyplanlessonPageContent studyplanlesson={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an studyplanlesson entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `studyplanlesson` object, and passes it to the `StudyplanlessonPageContentLazy` component.
 * The `StudyplanlessonPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the studyplanlesson entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/studyplanlesson/:id" element={<StudyplanlessonPage />} />
 *
 * // Navigating to "/studyplanlesson/12345" will render the page for the studyplanlesson entity with ID 12345.
 */
export const StudyplanlessonPage = () => {
    const {id} = useParams()
    const studyplanlesson = {id}
    return <StudyplanlessonPageContentLazy studyplanlesson={studyplanlesson} />
}