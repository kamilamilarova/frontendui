import { ExamInsert } from "../Components/ExamInsert";
import { ExamButton } from "../../Exam";
import { ExamPartsInsert } from "../Components/ExamPartsInsert";
import { StudentEvaluationInsert } from "../Components/StudentInsert";
import { EvaluationButton } from "../../Evaluation/Components/EvaluationCUDButton";
import { EvaluationDeleteButton } from "../Components/EvaluationDelete";
import { Card, ListGroup } from "react-bootstrap";

/**
 * A component for displaying the `exam` attribute of an studyplan entity.
 *
 * This component checks if the `exam` attribute exists on the `studyplan` object. If `exam` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `exam` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyplanExamAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.exam] - The exam attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `exam` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { exam: { id: 1, name: "Sample Exam" } };
 *
 * <StudyplanExamAttribute studyplan={studyplanEntity} />
 */

export const StudyplanExamAttribute = ({ studyplan, onBlur, readOnly }) => (
  <>
    <div className="mt-4">
      <ExamInsert
        studyplan={studyplan}
        onDone={() => onBlur({ target: { value: studyplan } })}
        readOnly={readOnly}
      />
    </div>

    <Card className="mt-4">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Card.Title className="mb-0">Klasifikace</Card.Title>
          {studyplan.exam?.id && (
            <ExamButton
              className="btn btn-outline-success"
              operation="U"
              exam={studyplan.exam}
              onDone={() => onBlur({ target: { value: studyplan } })}
              readOnly={readOnly}
            >
              Upravit
            </ExamButton>
          )}
        </div>
        {studyplan.exam ? (
          <>
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
            <div className="mt-3">
              <h5>Části zkoušky</h5>
              {studyplan.exam?.id && (
                <ExamPartsInsert
                  examId={studyplan.exam.id}
                  onDone={() => onBlur({ target: { value: studyplan } })}
                  readOnly={readOnly}
                />
              )}
              {Array.isArray(studyplan.exam.parts) && studyplan.exam.parts.length > 0 ? (
                <ListGroup>
                  {studyplan.exam.parts.map((part) => (
                    <ListGroup.Item key={part.id}>
                      <div>
                        <strong>Název:</strong> {part.name ?? "—"}
                      </div>
                      <div>
                        <strong>Popis:</strong> {part.description ?? "—"}
                      </div>
                      <div>
                        <strong>Min. body:</strong> {part.minScore ?? "—"}
                      </div>
                      <div>
                        <strong>Max. body:</strong> {part.maxScore ?? "—"}
                      </div>
                      <div>
                        <strong>Lastchange:</strong> {part.lastchange ?? "—"}
                      </div>
                      <div className="mt-2">
                        <ExamButton
                          className="btn btn-outline-success btn-sm"
                          operation="U"
                          exam={part}
                          onDone={() => onBlur({ target: { value: studyplan } })}
                          readOnly={readOnly}
                        >
                          Upravit část
                        </ExamButton>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div></div>
              )}
            </div>
          </>
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
          readOnly={readOnly}
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
                      <strong>Jméno:</strong> {evalItem.student.student.name ?? "—"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Příjmení:</strong> {evalItem.student.student.surname ?? "—"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Body:</strong> {evalItem.points ?? "—"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Známka:</strong> {evalItem.grade ?? "—"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Prošel:</strong>{" "}
                      {evalItem.passed !== undefined ? (evalItem.passed ? "Ano" : "Ne") : "—"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Lastchange:</strong> {evalItem.lastchange ?? "—"}
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="mt-2 d-flex gap-2">
                    <EvaluationButton
                      className="btn btn-outline-success"
                      operation="U"
                      evaluation={evalItem}
                      onDone={() => onBlur({ target: { value: studyplan } })}
                      readOnly={readOnly}
                    >
                      Upravit
                    </EvaluationButton>
                    <EvaluationDeleteButton
                      evaluation={evalItem}
                      onDone={() => onBlur({ target: { value: studyplan } })}
                      readOnly={readOnly}
                    />
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
  </>
);