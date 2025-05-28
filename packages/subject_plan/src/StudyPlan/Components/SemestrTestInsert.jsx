import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";  
import { useState } from "react";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";

const InsertSemesterTestAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($id: UUID!, $lastchange: DateTime!, $examId: UUID!) {
  studyPlanUpdate(
    studyPlan: {id: $id, lastchange: $lastchange, examId: $examId}
  ) {
    __typename
    ... on StudyPlanGQLModelUpdateError {
      input
      failed
      msg
      Entity {
        id
        lastchange
        examId
      }
    }
    ... on StudyPlanGQLModel {
      id
      lastchange
      examId
    }
  }
}`);


export const SemestrTestInsert = ({studyplan}) => {
    const { fetch: fetchInsert, loading, error } = useAsyncAction(
        InsertSemesterTestAsyncAction,
        {},
        { deferred: true }
    );

    const [delayer] = useState(() => CreateDelayer(500));
    const onCreate = () => {
    const insertParams = {
        id: studyplan.id,
        lastchange: studyplan.lastchange,
        examId: "7d915350-bfc8-4a5e-b94e-0d868cb072dc"  // id pro semestrální test
    };

    fetchInsert(insertParams)
      .then((json) => {
        console.log("Semestrální test přidán!:", json);
        alert("Semestrální test přidán!");
      }).catch((err) => {
        console.error("Chyba při přidávání semestrálního testu", err);
        alert("Chyba při přidávání semestrálního testu");
      });
  };

  return (
    <div>
      
      <button
        className="btn btn-primary mt-2"
        onClick={onCreate}
        disabled={loading }
      >
        Přidat semestrální test
      </button>

      {loading && <div>Probíhá přidávání semestrálního testu</div>}
      {error && <div style={{ color: "red" }}>Chyba: {error.message}</div>}
    </div>
  );
};
