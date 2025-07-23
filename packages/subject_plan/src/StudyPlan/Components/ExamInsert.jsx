import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";  
import { useState } from "react";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";

const ExamCreateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($id: UUID!, $name: String!) {
  examInsert(
    exam: {id: $id, name: $name}
  ) {
    __typename
    ... on InsertError {
      input
      failed
      msg
      
    }
    ... on ExamGQLModel {
      id
      name
    }
  }
}`);

const InsertExamAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($id: UUID!, $lastchange: DateTime!, $examId: UUID!) {
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


export const ExamInsert = ({studyplan, onDone = () => {}, readOnly}) => {
    const { fetch: fetchInsert, loading, error } = useAsyncAction(
        InsertExamAsyncAction,
        {},
        { deferred: true }
    );
    const { fetch: fetchCreateExam, loading: loadingExam, error: errorExam } = useAsyncAction(
        ExamCreateAsyncAction,
        {},
        { deferred: true }
    );

    const [name, setName] = useState("");
    const [delayer] = useState(() => CreateDelayer(500));

    const onCreate = async () => {
        try {
            // 1. Vytvoř zkoušku podle jména
            const examResult = await fetchCreateExam({ id: crypto.randomUUID(), name });
            console.log("examResult", examResult);
            if (examResult?.id) {
                // 2. Update studyplanu s novým examId
                const insertParams = {
                    id: studyplan.id,
                    lastchange: studyplan.lastchange,
                    examId: examResult.id
                };
                await fetchInsert(insertParams);
                //alert("Zkouška přidána!");
                setName("");
                onDone();
            } else {
                alert("Zkoušku se nepodařilo vytvořit.");
                // Výpis detailní chyby:
                if (examResult?.msg) {
                    alert("Chyba: " + examResult.msg);
                }
            }
        } catch (err) {
            console.error("Chyba při přidávání zkoušky", err);
            alert("Chyba při přidávání zkoušky");
        }
    };

    if (readOnly) {
        return null; // V režimu readOnly neukazujeme pole pro přidání
    }

    return (
        <div className="d-flex align-items-end mb-2" style={{ gap: "0.5rem" }}>
            <input
                className="form-control"
                type="text"
                placeholder="Název zkoušky"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={readOnly}
                style={{ maxWidth: 400 }}
            />
            <button
                className="btn btn-primary"
                onClick={onCreate}
                disabled={readOnly || !name.trim()}
                type="button"
            >
                Vytvořit zkoušku
            </button>

            {loading && <div>Probíhá vytváření zkoušky…</div>}
            {error && <div style={{ color: "red" }}>Chyba: {error.message}</div>}
        </div>
    );
};
