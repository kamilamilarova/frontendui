import { useState } from "react";
import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

const LessonLengthUpdateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($id: UUID!, $lastchange: DateTime!, $length: Int!) {
  studyPlanLessonUpdate(
    studyPlanLesson: {id: $id, lastchange: $lastchange, length: $length}
  ){__typename}
}`);

export const LessonLengthUpdate = ({ lesson, onDone, readOnly }) => {
  const [length, setLength] = useState(lesson.length ?? "");
  const { fetch, loading, error } = useAsyncAction(LessonLengthUpdateAsyncAction, {}, { deferred: true });

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !readOnly && length !== "") {
      await fetch({
        id: lesson.id,
        lastchange: lesson.lastchange,
        length: parseInt(length, 10)
      });
      if (onDone) onDone();
    }
  };

  if (readOnly) {
    return <span>{lesson.length ? `${lesson.length} ` : "neznámá"}</span>;
  }

  return (
    <span>
      <input
        className="form-control d-inline-block"
        type="number"
        min={0}
        placeholder="Délka lekce"
        value={length}
        onChange={e => setLength(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: 80, display: "inline-block", marginLeft: 8, marginRight: 8 }}
        disabled={loading}
      />
      {loading && <span style={{ marginLeft: 8 }}>Probíhá aktualizace…</span>}
      {error && <span style={{ color: "red", marginLeft: 8 }}>Chyba: {error.message}</span>}
    </span>
  );
};
