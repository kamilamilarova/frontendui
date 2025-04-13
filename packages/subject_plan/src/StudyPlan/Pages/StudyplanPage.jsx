import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudyplanLargeCard } from "../Components"
import { StudyplanReadAsyncAction } from "../Queries"
import { StudyplanPageNavbar } from "./StudyplanPageNavbar"

/**
 * A page content component for displaying detailed information about an studyplan entity.
 *
 * This component utilizes `StudyplanLargeCard` to create a structured layout and displays 
 * the serialized representation of the `studyplan` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the StudyplanPageContent component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The name or label of the studyplan entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an studyplan entity.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyplanPageContent studyplan={studyplanEntity} />
 */
const StudyplanPageContent = ({studyplan}) => {
    return (<>
        <StudyplanPageNavbar studyplan={studyplan} />
        <StudyplanLargeCard studyplan={studyplan}>
            Studyplan {JSON.stringify(studyplan)}
        </StudyplanLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an studyplan entity.
 *
 * This component is created using `createLazyComponent` and wraps `StudyplanPageContent` to provide
 * automatic data fetching for the `studyplan` entity. It uses the `StudyplanReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `studyplan` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.studyplan - The identifier of the studyplan entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `studyplan` entity data and displays it
 * using `StudyplanPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const studyplanId = "12345";
 *
 * <StudyplanPageContentLazy studyplan={studyplanId} />
 */
const StudyplanPageContentLazy = ({studyplan}) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudyplanReadAsyncAction, studyplan)
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
        {entity && <StudyplanPageContent studyplan={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an studyplan entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `studyplan` object, and passes it to the `StudyplanPageContentLazy` component.
 * The `StudyplanPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the studyplan entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/studyplan/:id" element={<StudyplanPage />} />
 *
 * // Navigating to "/studyplan/12345" will render the page for the studyplan entity with ID 12345.
 */
export const StudyplanPage = () => {
    const {id} = useParams()
    const studyplan = {id}
    return <StudyplanPageContentLazy studyplan={studyplan} />
}