import { TopicURI } from "../Components/TopicLink"
import { TopicPage } from "./TopicPage"

/**
 * A router segment definition for the Topic page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `TopicURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} TopicRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/topic/topic/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <TopicPage />.
 */
export const TopicRouterSegment = {
    path: `/${TopicURI}:id`,
    element: <TopicPage />,
}