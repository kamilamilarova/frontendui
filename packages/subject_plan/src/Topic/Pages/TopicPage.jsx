import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { TopicLargeCard } from "../Components"
import { TopicReadAsyncAction } from "../Queries"
import { TopicPageNavbar } from "./TopicPageNavbar"

/**
 * A page content component for displaying detailed information about an topic entity.
 *
 * This component utilizes `TopicLargeCard` to create a structured layout and displays 
 * the serialized representation of the `topic` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the TopicPageContent component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {string|number} props.topic.id - The unique identifier for the topic entity.
 * @param {string} props.topic.name - The name or label of the topic entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an topic entity.
 *
 * @example
 * // Example usage:
 * const topicEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TopicPageContent topic={topicEntity} />
 */
const TopicPageContent = ({topic}) => {
    return (<>
        <TopicPageNavbar topic={topic} />
        <TopicLargeCard topic={topic}>
            Topic {JSON.stringify(topic)}
        </TopicLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an topic entity.
 *
 * This component is created using `createLazyComponent` and wraps `TopicPageContent` to provide
 * automatic data fetching for the `topic` entity. It uses the `TopicReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `topic` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.topic - The identifier of the topic entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `topic` entity data and displays it
 * using `TopicPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const topicId = "12345";
 *
 * <TopicPageContentLazy topic={topicId} />
 */
const TopicPageContentLazy = ({topic}) => {
    const { error, loading, entity, fetch } = useAsyncAction(TopicReadAsyncAction, topic)
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
        {entity && <TopicPageContent topic={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an topic entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `topic` object, and passes it to the `TopicPageContentLazy` component.
 * The `TopicPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the topic entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/topic/:id" element={<TopicPage />} />
 *
 * // Navigating to "/topic/12345" will render the page for the topic entity with ID 12345.
 */
export const TopicPage = () => {
    const {id} = useParams()
    const topic = {id}
    return <TopicPageContentLazy topic={topic} />
}