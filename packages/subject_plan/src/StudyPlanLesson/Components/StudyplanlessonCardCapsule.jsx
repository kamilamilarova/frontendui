import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StudyplanlessonLink } from "./StudyplanlessonLink"

/**
 * A specialized card component that displays an `StudyplanlessonLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StudyplanlessonLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `studyplanlesson` object.
 *
 * @component
 * @param {Object} props - The props for the StudyplanlessonCardCapsule component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The display name for the studyplanlesson entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StudyplanlessonCardCapsule } from './StudyplanlessonCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const studyplanlessonEntity = { id: 123, name: "Example Entity" };
 *
 * <StudyplanlessonCardCapsule studyplanlesson={studyplanlessonEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StudyplanlessonCardCapsule>
 */
export const StudyplanlessonCardCapsule = ({studyplanlesson, children, title=<><PersonFill /> <StudyplanlessonLink studyplanlesson={studyplanlesson} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
