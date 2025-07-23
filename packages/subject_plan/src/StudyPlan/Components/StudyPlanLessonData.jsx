import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";


const InsertStudyPlanLessonAsyncAction = createAsyncGraphQLAction(
    `mutation MyMutation($planId: UUID!, $topicId: UUID!, $lessontypeId: UUID!, $id: UUID, $name: String, $length: Int, $eventId: UUID!) {
  studyPlanLessonInsert(
    studyPlanLesson: {lessontypeId: $lessontypeId, planId: $planId, topicId: $topicId, id: $id, name: $name, length: $length, eventId: $eventId}
  ) {
    __typename
    ...Error
    ...StudyPlanLesson
  }
}

fragment Error on InsertError {
  msg
  failed
  input
}

fragment StudyPlanLesson on StudyPlanLessonGQLModel {
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

export const StudyPlanLessonData = ({studyplan, onDone = () => {}, readOnly }) => {
  const { fetch: fetchInsert, loading, error } = useAsyncAction(
    InsertStudyPlanLessonAsyncAction,
    {},
    { deferred: true }
  );

  const [name, setName] = useState("");
  const [delayer] = useState(() => CreateDelayer(1000)); // nepovinné

  const onCreate = () => {
    const insertParams = {
      id: crypto.randomUUID(),
      length: 90, 
      name,
      planId: studyplan.id,//"8bde6144-7b82-46d1-ba38-aaab9fa54191",
      topicId: "ef1c48b7-4f65-4696-b89f-a95c2cf8814f",
      lessontypeId: "e2b7cbf6-95e1-11ed-a1eb-0242ac120002",
      eventId: crypto.randomUUID(), // pokud je potřeba, jinak může být undefined
    };

    fetchInsert(insertParams )
      .then((json) => {
        console.log("Lekce vytvořena:", json);
        //alert("Lekce vytvořena!");
        setName("");
        onDone(); // volání callbacku pro aktualizaci UI
        
        
        // TODO: doplnit třeba refetch dat nebo dispatch update
      })
      .catch((err) => {
        console.error("Chyba při vytváření lekce", err);
        alert("Chyba při vytváření lekce");
      });
  };

  // Pokud je readOnly, nezobrazuj input ani tlačítko
  if (readOnly) return null;

  return (
    <div className="d-flex align-items-end mb-2" style={{ gap: "0.5rem" }}>
      <input
        className="form-control"
        type="text"
        placeholder="Název lekce"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={readOnly}
        style={{ maxWidth: 400 }}
      />
      <button
        className="btn btn-primary"
        onClick={onCreate}
        disabled={readOnly || !name.trim()}
        type="button"
      >
        Vytvořit lekci
      </button>

      {loading && <div>Probíhá vytváření lekce…</div>}
      {error && <div style={{ color: "red" }}>Chyba: {error.message}</div>}
    </div>
  );
};