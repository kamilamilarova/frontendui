import { StudyplanlessonURI } from "../Components/StudyplanlessonLink"
import { StudyplanlessonPage } from "./StudyplanlessonPage"

/**
 * A router segment definition for the Studyplanlesson page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `StudyplanlessonURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} StudyplanlessonRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/studyplanlesson/studyplanlesson/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <StudyplanlessonPage />.
 */
export const StudyplanlessonRouterSegment = {
    path: `/${StudyplanlessonURI}:id`,
    element: <StudyplanlessonPage />,
}