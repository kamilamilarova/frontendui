import { StudyPlanLessonData } from "../Components/StudyPlanLessonData"; 
import { StudyPlanLessonDelete } from "../Components/StudyPlanLessonDelete"; 
import { InstructorInsert } from "../Components/InstructorInsert";
import { InstructorDelete } from "../Components/InstructorDelete";
import { FacilitiesInsert } from "../Components/FacilitiesInsert";
import { FacilityDelete } from "../Components/FacilityDelete";
import { StudyGroupInsert } from "../Components/StudyGroupInsert";
import { StudyGroupDelete } from "../Components/StudyGroupDelete";
import { LessonLengthUpdate } from "../Components/LessonLengthUpdate";
import { Card, ListGroup } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useState } from "react";

/**
 * A component for displaying the `lessons` attribute of an studyplan entity.
 *
 * This component checks if the `lessons` attribute exists on the `studyplan` object. If `lessons` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `lessons` array and
 * displays a placeholder message and a JSON representation for each item in the `lessons`.
 *
 * @component
 * @param {Object} props - The props for the StudyplanLessonsAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {Array} [props.studyplan.lessons] - An array of lessons items associated with the studyplan entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `lessons` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { 
 *   lessons: [
 *     { id: 1, name: "Lesson Item 1" }, 
 *     { id: 2, name: "Lesson Item 2" }
 *   ] 
 * };
 *
 * <StudyplanLessonsAttribute studyplan={studyplanEntity} />
 */


export const StudyplanLessonsAttribute = ({ studyplan, onChange, onBlur, readOnly }) => {
  const [expandedLessonIndex, setExpandedLessonIndex] = useState(null);

  const toggleLesson = (index) => {
    setExpandedLessonIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <>
      <h3>Obsah studijního plánu</h3>
      <StudyPlanLessonData studyplan={studyplan} onDone={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} />

      {studyplan.lessons && studyplan.lessons.length > 0 ? (
        <div className="list-group">
          {studyplan.lessons.map((lesson, index) => (
            <div key={lesson.id} className="list-group-item">
              <div
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => toggleLesson(index)}
              >
                <StudyPlanLessonDelete lesson={lesson} onDeleted={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} />
              </div>
              {expandedLessonIndex === index && (
                <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                  <p><strong>Název:</strong> {lesson.name ?? `Lekce #${index + 1}`}</p>

                  <h5 className="mt-3">Instruktoři</h5>
                  <InstructorInsert lesson={lesson} onChange={onChange} onChoose={(user, fetchLessonUpdate) => {
                    const LessonUpdateParams = {
                      planitemId: lesson.id,
                      userId: user.id
                    }
                    fetchLessonUpdate(LessonUpdateParams);
                    onBlur({ target: { value: studyplan } })
                  }}
                    readOnly={readOnly} />
                  <ListGroup>
                    {lesson.instructors?.length > 0 ? lesson.instructors.map(instr => (
                      <ListGroup.Item key={instr.id} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <Person className="me-2" />
                          <span>{instr.name} {instr.surname}</span>
                        </div>
                        <InstructorDelete lesson={lesson} user={instr} onInstructorRemoved={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} />
                      </ListGroup.Item>
                    )) : (
                      <ListGroup.Item>Žádní instruktoři</ListGroup.Item>
                    )}
                  </ListGroup>

                  <h5 className="mt-3">Místnosti</h5>
                  <FacilitiesInsert lesson={lesson} onChoose={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} />
                  <ListGroup>
                    {lesson.facilities?.length > 0 ? lesson.facilities.map(facility => (
                      <ListGroup.Item key={facility.id} className="d-flex align-items-center justify-content-between">
                        <span>{facility.name}</span>
                        <FacilityDelete lesson={lesson} facility={facility} onFacilityRemoved={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} />
                      </ListGroup.Item>
                    )) : (
                      <ListGroup.Item>Žádné místnosti</ListGroup.Item>
                    )}
                  </ListGroup>

                  <h5 className="mt-3">Studijní skupiny</h5>
                  <StudyGroupInsert lesson={lesson} onChange={onChange} onChoose={(group, fetchGroupUpdate) => {
                    const GroupUpdateParams = {
                      planitemId: lesson.id,
                      groupId: group.id
                    };
                    fetchGroupUpdate(GroupUpdateParams);
                    onBlur({ target: { value: studyplan } });
                  }}
                    readOnly={readOnly} />
                  <ListGroup>
                    {lesson.studyGroups?.length > 0 ? lesson.studyGroups.map(group => (
                      <ListGroup.Item key={group.id} className="d-flex align-items-center justify-content-between">
                        <span>{group.name}</span>
                        <StudyGroupDelete lesson={lesson} group={group} onGroupRemoved={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} />
                      </ListGroup.Item>
                    )) : (
                      <ListGroup.Item>Žádné studijní skupiny</ListGroup.Item>
                    )}
                  </ListGroup>

                  <p>
                    <strong>Délka:</strong>{" "}
                    <LessonLengthUpdate lesson={lesson} onDone={() => onBlur({ target: { value: studyplan } })} readOnly={readOnly} inline /> min
                  </p>
                  <p><strong>Lastchange:</strong> {lesson.lastchange ?? ""}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Žádné lekce</p>
      )}
    </>
  );
};