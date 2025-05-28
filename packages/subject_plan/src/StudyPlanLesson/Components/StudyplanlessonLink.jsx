import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const StudyplanlessonURI = `/studyplanlesson/studyplanlesson/view/`;

/**
 * A React component that renders a `ProxyLink` to an "studyplanlesson" entity's view page.
 *
 * The target URL is dynamically constructed using the `studyplanlesson` object's `id`, and the link displays
 * the `studyplanlesson` object's `name` as its clickable content.
 *
 * @function StudyplanlessonLink
 * @param {Object} props - The properties for the `StudyplanlessonLink` component.
 * @param {Object} props.studyplanlesson - The object representing the "studyplanlesson" entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the "studyplanlesson" entity. Used to construct the target URL.
 * @param {string} props.studyplanlesson.name - The display name for the "studyplanlesson" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "studyplanlesson" entity's view page.
 *
 * @example
 * // Example usage with a sample studyplanlesson entity:
 * const studyplanlessonEntity = { id: 123, name: "Example Studyplanlesson Entity" };
 * 
 * <StudyplanlessonLink studyplanlesson={studyplanlessonEntity} />
 * // Renders: <ProxyLink to="/studyplanlesson/studyplanlesson/view/123">Example Studyplanlesson Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/studyplanlesson/studyplanlesson/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StudyplanlessonLink = ({studyplanlesson, ...props}) => {
    return <ProxyLink to={StudyplanlessonURI + studyplanlesson.id} {...props}>{studyplanlesson.name}</ProxyLink>
}