import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudyplanlessonCardCapsule } from "./StudyplanlessonCardCapsule"
import { StudyplanlessonMediumCard } from "./StudyplanlessonMediumCard"

/**
 * A large card component for displaying detailed content and layout for an studyplanlesson entity.
 *
 * This component wraps an `StudyplanlessonCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StudyplanlessonMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StudyplanlessonLargeCard component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {string|number} props.studyplanlesson.id - The unique identifier for the studyplanlesson entity.
 * @param {string} props.studyplanlesson.name - The name or label of the studyplanlesson entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyplanlessonLargeCard studyplanlesson={studyplanlessonEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StudyplanlessonLargeCard>
 */
export const StudyplanlessonLargeCard = ({studyplanlesson, children}) => {
    return (
        <StudyplanlessonCardCapsule studyplanlesson={studyplanlesson} >
            <Row>
                <LeftColumn>
                    <StudyplanlessonMediumCard studyplanlesson={studyplanlesson}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StudyplanlessonCardCapsule>
    )
}
