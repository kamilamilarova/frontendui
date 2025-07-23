import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudyplanCardCapsule } from "./StudyplanCardCapsule"
import { StudyplanMediumCard } from "./StudyplanMediumCard"
import { StudyplanLessonsAttribute } from "../Vectors/StudyPlanLessonsAttribute"
import { StudyplanExamAttribute } from "../Scalars/StudyPlanExamAttribute";


/**
 * A large card component for displaying detailed content and layout for an studyplan entity.
 *
 * This component wraps an `StudyplanCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StudyplanMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StudyplanLargeCard component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The name or label of the studyplan entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyplanLargeCard studyplan={studyplanEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StudyplanLargeCard>
 */


export const StudyplanLargeCard = ({ studyplan, children, onChange, onBlur, readOnly }) => (
  <StudyplanCardCapsule studyplan={studyplan}>
    <Row>
      <LeftColumn>
        <StudyplanMediumCard studyplan={studyplan} />
      </LeftColumn>
      <MiddleColumn>
        <StudyplanLessonsAttribute
          studyplan={studyplan}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
        />
        {children}
        <StudyplanExamAttribute
          studyplan={studyplan}
          onBlur={onBlur}
          readOnly={readOnly}
        />
      </MiddleColumn>
    </Row>
  </StudyplanCardCapsule>
);
