import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StudyplanLink } from "./StudyplanLink"

/**
 * A specialized card component that displays an `StudyplanLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StudyplanLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `studyplan` object.
 *
 * @component
 * @param {Object} props - The props for the StudyplanCardCapsule component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The display name for the studyplan entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StudyplanCardCapsule } from './StudyplanCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const studyplanEntity = { id: 123, name: "Example Entity" };
 *
 * <StudyplanCardCapsule studyplan={studyplanEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StudyplanCardCapsule>
 */
export const StudyplanCardCapsule = ({studyplan, children, title=<><PersonFill /> <StudyplanLink studyplan={studyplan} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
