import { PersonFill } from "react-bootstrap-icons"
import { StudyplanLink } from "./StudyplanLink"
import { StudyplanCardCapsule } from "./StudyplanCardCapsule"
import { StudyplanMediumContent } from "./StudyplanMediumContent"

/**
 * A card component that displays detailed content for an studyplan entity.
 *
 * This component combines `StudyplanCardCapsule` and `StudyplanMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the studyplan entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StudyplanMediumCard component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The name or label of the studyplan entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyplanMediumCard studyplan={studyplanEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StudyplanMediumCard>
 */
export const StudyplanMediumCard = ({studyplan, children}) => {
    return (
        <StudyplanCardCapsule title={<><PersonFill /> <StudyplanLink studyplan={studyplan} /></>}>
            <StudyplanMediumContent studyplan={studyplan}>
                {children}
            </StudyplanMediumContent>
        </StudyplanCardCapsule>
    )
}
