import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";



const GroupUpdateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($planitemId: UUID!, $groupId: UUID!) {
  studyPlanLessonRemoveGroup(
    studyPlanLesson: {planitemId: $planitemId, groupId: $groupId}
  ) {
    __typename
    ...Error
  }
}

fragment Error on StudyPlanLessonGQLModelUpdateError {
  msg
  failed
  input
}`)


export const StudyGroupDelete = ({ lesson, group, onGroupRemoved, readOnly }) => {
  const { fetch: removeStudyGroup, loading, error } = useAsyncAction(
    GroupUpdateAsyncAction,
    lesson,
    { deferred: true }
  );

  const handleRemove = () => {
    if (!lesson.id || !group.id) return;

    removeStudyGroup({ planitemId: lesson.id, groupId: group.id })
      .then(() => {
        onGroupRemoved?.(group.id); // Vyvolá update v parent komponentě
      })
      .catch((err) => {
        console.error("Chyba při odebírání studijní skupiny:", err);
        alert("Nepodařilo se odebrat studijní skupinu");
      });
  };

  if (readOnly) {
    return null; // V režimu readOnly neukazujeme tlačítko
  }

  return (
    
      
      <button
        onClick={handleRemove}
        disabled={loading}
        title="Odebrat instruktora"
        className="ml-auto text-gray-500 hover:text-red-600"
      >
        x
      </button>
    
 
  );
};