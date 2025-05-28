import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";



const LessonUpdateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($planitemId: UUID!, $userId: UUID!) {
  studyPlanLessonRemoveInstructor(
    studyPlanLesson: {planitemId: $planitemId, userId: $userId}
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


export const InstructorDelete = ({ lesson, user, onInstructorRemoved }) => {
  const { fetch: removeInstructor, loading, error } = useAsyncAction(
    LessonUpdateAsyncAction,
    lesson,
    { deferred: true }
  );

  const handleRemove = () => {
    if (!lesson.id || !user.id) return;

    removeInstructor({ planitemId: lesson.id, userId: user.id })
      .then(() => {
        onInstructorRemoved?.(user.id); // Vyvolá update v parent komponentě
      })
      .catch((err) => {
        console.error("Chyba při odebírání instruktora:", err);
        alert("Nepodařilo se odebrat instruktora");
      });
  };

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