import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";


const DeleteStudyPlanLessonAsyncAction = createAsyncGraphQLAction(`mutation StudyplanlessonDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studyPlanLessonDelete(
    studyPlanLesson: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudyPlanLessonGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudyplanlessonLarge
      }
    }
  }
}

fragment StudyplanlessonLarge on StudyPlanLessonGQLModel {
  __typename
  id
  name
  order
  length
  lessontypeId
  event {
    startdate
    enddate
  }
  instructors {
    id
    name
    surname
  }
  studyGroups {
    id
    name
  }
  facilities {
    id
    name
  }
  topic {
    id
    name
    description
  }
}`)

export const StudyPlanLessonDelete = ({ lesson, onDeleted }) => {
    const { fetch: deleteLesson, loading, error } = useAsyncAction(
      DeleteStudyPlanLessonAsyncAction,
      lesson,
      { deferred: true }
    );
  
    const handleDelete = () => {
      if (!lesson.id || !lesson.lastchange) {
        alert("Chybí ID nebo lastchange lekce.");
        return;
      }
  
      deleteLesson({ id: lesson.id, lastchange: lesson.lastchange })
        .then(() => {
          alert(`Lekce '${lesson.name}' byla smazána.`);
          onDeleted?.(lesson.id); // zavolej callback pro rodiče
        })
        .catch((err) => {
          console.error("Chyba při mazání lekce", err);
          alert("Mazání selhalo");
        });
    };
  
    return (
      <li className="mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <span>{lesson.name}</span>
          <pre style={{display:"none"}}>{JSON.stringify(lesson)}</pre>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            Smazat
          </button>
        </div>
        {error && <div style={{ color: "red" }}>{error.message}</div>}
      </li>
    );
  };
