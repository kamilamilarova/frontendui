import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";



const FacilityUpdateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($planitemId: UUID!, $facilityId: UUID!) {
  studyPlanLessonRemoveFacility(
    studyPlanLesson: {planitemId: $planitemId, facilityId: $facilityId}
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


export const FacilityDelete = ({ lesson, facility, onFacilityRemoved }) => {
  const { fetch: removeFacility, loading, error } = useAsyncAction(
    FacilityUpdateAsyncAction,
    lesson,
    { deferred: true }
  );

  const handleRemove = () => {
    if (!lesson.id || !facility.id) return;

    removeFacility({ planitemId: lesson.id, facilityId: facility.id })
      .then(() => {
        onFacilityRemoved?.(facility.id); // Vyvolá update v parent komponentě
      })
      .catch((err) => {
        console.error("Chyba při odebírání učebny:", err);
        alert("Nepodařilo se odebrat učebnu");
      });
  };

  return (
    
      
      <button
        onClick={handleRemove}
        disabled={loading}
        title="Odebrat učebnu"
        className="ml-auto text-gray-500 hover:text-red-600"
      >
        x
      </button>
    
 
  );
};