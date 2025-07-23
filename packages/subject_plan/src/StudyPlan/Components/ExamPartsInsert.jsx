import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";


const ExamPartCreateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($id: UUID!, $name: String!, $parentId: UUID!) {
  examInsert(
    exam: {id: $id, name: $name, parentId: $parentId}
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

export const ExamPartsInsert = ({ examId, onDone = () => {} , readOnly}) => {
  const [name, setName] = useState("");
  const { fetch, loading, error } = useAsyncAction(ExamPartCreateAsyncAction, {}, { deferred: true });

  const handleCreate = async () => {
    const id = crypto.randomUUID();
    await fetch({ id, name, parentId: examId });
    setName("");
    onDone();
  };

  if (readOnly) {
    return null;
  }

  return (
    <div className="d-flex align-items-end mb-2" style={{ gap: "0.5rem" }}>
      <input
        className="form-control"
        type="text"
        placeholder="Název části zkoušky"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
        style={{ maxWidth: 400 }}
      />
      <button
        className="btn btn-primary"
        onClick={handleCreate}
        disabled={loading || !name.trim()}
        type="button"
      >
        Přidat část zkoušky
      </button>
      {loading && <div className="ms-2">Probíhá přidávání…</div>}
      {error && <div style={{ color: "red" }} className="ms-2">Chyba: {error.message}</div>}
    </div>
  );
};