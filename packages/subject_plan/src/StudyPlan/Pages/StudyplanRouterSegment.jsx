import { StudyplanURI } from "../Components/StudyplanLink"
import { StudyplanPage } from "./StudyplanPage"

/**
 * A router segment definition for the Studyplan page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `StudyplanURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} StudyplanRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/studyplan/studyplan/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <StudyplanPage />.
 */
export const StudyplanRouterSegment = {
    path: `/${StudyplanURI}:id`,
    element: <StudyplanPage />,
}