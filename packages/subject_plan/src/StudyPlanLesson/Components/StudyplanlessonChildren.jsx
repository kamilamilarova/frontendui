import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StudyplanlessonChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `studyplanlesson` entity along with other props to all child elements.
 * This component is useful for injecting a common `studyplanlesson` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StudyplanlessonChildren component.
 * @param {any} props.studyplanlesson - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `studyplanlesson` entity.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { id: 1, message: "No data available" };
 *
 * <StudyplanlessonChildren studyplanlesson={studyplanlessonEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StudyplanlessonChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'studyplanlesson' prop with the specified entity.
 */
export const StudyplanlessonChildren = ({studyplanlesson, children, ...props}) => <ChildWrapper studyplanlesson={studyplanlesson} children={children} {...props} />