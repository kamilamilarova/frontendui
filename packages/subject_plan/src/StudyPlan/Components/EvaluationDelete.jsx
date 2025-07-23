import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";


const EvaluationDeleteAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($id: UUID!, $lastchange: DateTime!) {
  evaluationDelete(
    evaluation: {id: $id, lastchange: $lastchange}
  ) {
    __typename
  }
}`);

export const EvaluationDeleteButton = ({ evaluation, onDone = () => {}, readOnly }) => {
  const { fetch, loading } = useAsyncAction(EvaluationDeleteAsyncAction, {}, { deferred: true });

  const handleDelete = async () => {
    await fetch({ id: evaluation.id, lastchange: evaluation.lastchange });
    onDone();
  };

  if (readOnly) {
    return null;
  }

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Mažu..." : "Smazat"}
    </button>
  );
};
