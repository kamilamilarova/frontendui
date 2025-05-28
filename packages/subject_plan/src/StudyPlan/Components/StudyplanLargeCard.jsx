import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudyplanCardCapsule } from "./StudyplanCardCapsule"
import { StudyplanMediumCard } from "./StudyplanMediumCard"
import { StudyPlanLessonData } from "./StudyPlanLessonData"
import { StudyPlanLessonDelete } from "./StudyPlanLessonDelete"
import { StudyGroupInsert } from "./StudyGroupInsert"
import { useState } from "react"
import { InstructorInsert } from "./InstructorInsert"
import { Card, ListGroup } from "react-bootstrap"
import { Person  } from "react-bootstrap-icons"
import { InstructorDelete } from "./InstructorDelete"
import { FacilitiesInsert } from "./FacilitiesInsert"
import { FacilityDelete } from "./FacilityDelete"
import { StudyGroupDelete } from "./StudyGroupDelete"
import { ExamInsert } from "./ExamInsert"
import { ExamButton } from "../../Exam"
import { StudentEvaluationInsert } from "./StudentInsert"
import { EvaluationButton } from "../../Evaluation/Components/EvaluationCUDButton"
import { EvaluationDeleteButton } from "./EvaluationDelete"


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


export const StudyplanLargeCard = ({ studyplan, children, onChange, onBlur }) => {
    const [expandedLessonIndex, setExpandedLessonIndex] = useState(null);
    const [expandedEvaluationIndex, setExpandedEvaluationIndex] = useState(null);

    const toggleLesson = (index) => {
        setExpandedLessonIndex(prevIndex => prevIndex === index ? null : index);
    };

    console.log("StudyplanLargeCard", studyplan);

    return (
        <StudyplanCardCapsule studyplan={studyplan}>
            <Row>
                <LeftColumn>
                    <StudyplanMediumCard studyplan={studyplan} />
                </LeftColumn>
                <MiddleColumn>
                    <h3>Obsah studijního plánu</h3>
                    <StudyPlanLessonData studyplan={studyplan}  />

                    {studyplan.lessons && studyplan.lessons.length > 0 ? (
                        <ul className="list-group">
                            {studyplan.lessons.map((lesson, index) => (
                                <li key={lesson.id} className="list-group-item">
                                    <div
                                        style={{ cursor: "pointer", fontWeight: "bold" }}
                                        onClick={() => toggleLesson(index)}
                                    >
                                        {lesson.name || `Lekce #${index + 1}`}
                                        <StudyPlanLessonDelete lesson={lesson} onDeleted={() => onBlur({ target: { value: studyplan } })} />
                                    </div>
                                    {expandedLessonIndex === index && (
                                        <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                                            <p><strong>Délka:</strong> {lesson.length ? `${lesson.length} min` : "neznámá"}</p>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Instruktoři</Card.Title>

                                                    <InstructorInsert lesson={lesson} onChange={onChange} onChoose={(user, fetchLessonUpdate) => {
                                                        console.log("onSelect", user.id, user.name)
                                                        const LessonUpdateParams = {
                                                            planitemId: lesson.id,
                                                            userId: user.id
                                                        }

                                                        fetchLessonUpdate(LessonUpdateParams);
                                                        onBlur({ target: { value: studyplan } })
                                                    }} />

                                                    <ListGroup>
                                                        {lesson.instructors?.map(instr => (
                                                            <ListGroup.Item key={instr.id} className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <Person className="me-2" />
                                                                <span>{instr.name} {instr.surname}</span>
                                                            </div>
                                                            <InstructorDelete
                                                                lesson={lesson}
                                                                user={instr}
                                                                onInstructorRemoved={() => onBlur({ target: { value: studyplan } })}
                                                            />
                                                            </ListGroup.Item>
                                                        ))}
                                                        </ListGroup>

                                                </Card.Body>
                                            </Card>

                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Místnosti</Card.Title>

                                                    <FacilitiesInsert  lesson={lesson} onChange={onChange} onChoose={(facility, fetchFacilityUpdate) => {
                                                        const FacilityUpdateParams = {
                                                            planitemId: lesson.id,
                                                            facilityId: facility.id
                                                        };
                                                        fetchFacilityUpdate(FacilityUpdateParams);
                                                        onBlur({ target: { value: studyplan } });
                                                        }} />

                                                    <ListGroup>
                                                      {lesson.facilities?.length > 0 ? (
                                                        lesson.facilities.map(facility => (
                                                          <ListGroup.Item key={facility.id} className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center gap-2">
                                                              {/* případně můžeš přidat ikonu */}
                                                              <span>{facility.name}</span>
                                                            </div>
                                                            <FacilityDelete
                                                                lesson={lesson}
                                                                facility={facility}
                                                                onFacilityRemoved={() => onBlur({ target: { value: studyplan } })}
                                                            />                      
                                                          </ListGroup.Item>
                                                        ))
                                                      ) : (
                                                        <ListGroup.Item>Žádné místnosti</ListGroup.Item>
                                                      )}
                                                    </ListGroup>
                                                </Card.Body>
                                            </Card>

                                            <Card>
                                              <Card.Body>
                                                <Card.Title>Studijní skupiny</Card.Title>

                                                <StudyGroupInsert
                                                  lesson={lesson}
                                                  onChange={onChange}
                                                  onChoose={(group, fetchGroupUpdate) => {
                                                    const GroupUpdateParams = {
                                                      planitemId: lesson.id,
                                                      groupId: group.id
                                                    };
                                                    fetchGroupUpdate(GroupUpdateParams);
                                                    onBlur({ target: { value: studyplan } });
                                                  }}
                                                />

                                                <ListGroup>
                                                  {lesson.studyGroups?.length > 0 ? (
                                                    lesson.studyGroups.map(group => (
                                                      <ListGroup.Item key={group.id} className="d-flex align-items-center justify-content-between">
                                                        <span>{group.name}</span>
                                                        <StudyGroupDelete 
                                                          lesson={lesson}
                                                          group={group}
                                                          onGroupRemoved={() => onBlur({ target: { value: studyplan } })}
                                                        />
                                                      </ListGroup.Item>
                                                    ))
                                                  ) : (
                                                    <ListGroup.Item>Žádné studijní skupiny</ListGroup.Item>
                                                  )}
                                                </ListGroup>
                                              </Card.Body>
                                            </Card>

                                            <ul>

                                            </ul>
                                            <p><strong>Téma:</strong> {lesson.topic?.name ?? "bez tématu"}</p>
                                            <p><strong>Lastchange:</strong> {lesson.lastchange ?? ""}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Žádné lekce</p>
                    )}

                    {children}

                    <div className="mt-4">
                      <ExamInsert studyplan={studyplan} />
                    </div>

                    <Card className="mt-4">
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <Card.Title className="mb-0">Klasifikace</Card.Title>
                          {studyplan.exam?.id && (
                            <ExamButton operation="U" exam={studyplan.exam} onDone={() => onBlur({ target: { value: studyplan } })}>
                              Upravit
                            </ExamButton>
                          )}
                        </div>
                        {studyplan.exam ? (
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              <strong>Název:</strong> {studyplan.exam.name ?? "—"}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Minimální počet bodů:</strong> {studyplan.exam.minScore ?? "—"}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Maximální počet bodů:</strong> {studyplan.exam.maxScore ?? "—"}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Popis:</strong> {studyplan.exam.description ?? "—"}
                            </ListGroup.Item>
                          </ListGroup>
                        ) : (
                          <div>Žádné zkoušky</div>
                        )}
                      </Card.Body>
                    </Card>

                    <div className="mt-4">
                      {studyplan.exam?.id && studyplan.semester?.subject?.program?.id && (
                        <StudentEvaluationInsert
                          examId={studyplan.exam.id}
                          programId={studyplan.semester.subject.program.id}
                          onDone={() => onBlur({ target: { value: studyplan } })}
                        />
                      )}
                    </div>

                    <Card className="mt-4">
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <Card.Title className="mb-0">Hodnocení</Card.Title>
                        </div>
                        {Array.isArray(studyplan.exam?.evaluations) && studyplan.exam?.evaluations.length > 0 ? (
                          <div className="d-flex flex-column gap-3">
                            {studyplan.exam.evaluations.map((evalItem, idx) => (
                              <Card key={evalItem.id || idx} className="mb-2">
                                <Card.Body>
                                  <ListGroup variant="flush">
                                    <ListGroup.Item>
                                      <strong>ID:</strong> {evalItem.id ?? "—"}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <strong>Student ID:</strong> {evalItem.studentId ?? "—"}
                                    </ListGroup.Item>                                   
                                    <ListGroup.Item>
                                      <strong>Body:</strong> {evalItem.points ?? "—"}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <strong>Prošel:</strong> {evalItem.passed !== undefined ? (evalItem.passed ? "Ano" : "Ne") : "—"}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <strong>Lastchange:</strong> {evalItem.lastchange ?? "—"}
                                    </ListGroup.Item>
                                  </ListGroup>
                                  <div className="mt-2 d-flex gap-2">
                                    <EvaluationButton
                                        operation="U"
                                        evaluation={evalItem}
                                        onDone={() => onBlur({ target: { value: studyplan } })}
                                      >Upravit</EvaluationButton>
                                    <EvaluationDeleteButton evaluation={evalItem} onDone={() => onBlur({ target: { value: studyplan } })}/>
                                  </div>
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div>Žádné Hodnocení</div>
                        )}
                      </Card.Body>
                    </Card>
                    
                    
                </MiddleColumn>
            </Row>
        </StudyplanCardCapsule>
    );
};
