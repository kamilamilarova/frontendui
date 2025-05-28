import { StudyplanMediumCard } from "./StudyplanMediumCard"
/**
 * A component that displays medium-level content for an studyplan entity.
 *
 * This component renders a label "StudyplanMediumContent" followed by a serialized representation of the `studyplan` object
 * and any additional child content. It is designed to handle and display information about an studyplan entity object.
 *
 * @component
 * @param {Object} props - The properties for the StudyplanMediumContent component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {string|number} props.studyplan.id - The unique identifier for the studyplan entity.
 * @param {string} props.studyplan.name - The name or label of the studyplan entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `studyplan` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudyplanMediumContent studyplan={studyplanEntity}>
 *   <p>Additional information about the entity.</p>
 * </StudyplanMediumContent>
 */
export const StudyplanMediumContent = ({ studyplan, children }) => {
  const uniqueBy = (arr, keyFn) => {
    const seen = new Set();
    return arr.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const allLessons = studyplan?.lessons ?? [];

  const uniqueGroups = uniqueBy(
    allLessons.flatMap(l => l.studyGroups || []),
    g => g.id
  );

  const uniqueRooms = uniqueBy(
    allLessons.flatMap(l => l.facilities || []),
    r => r.id
  );

  const uniqueInstructors = uniqueBy(
    allLessons.flatMap(l => l.instructors || []),
    i => i.id
  );

  return (
    <>
      <h2>Stránka studijního plánu</h2>
      <p><strong>ID:</strong> {studyplan.id}</p>
      <p><strong>Lastchange:</strong> {studyplan.lastchange}</p>

      <h3>Informace o semestru</h3>
      {studyplan?.semester ? (
        <ul>
          <li><strong>Semestr:</strong> {studyplan.semester.order}</li>
          <li><strong>Předmět:</strong> {studyplan.semester.subject?.name}</li>
          <li><strong>Program:</strong> {studyplan.semester.subject?.program?.name}</li>
        </ul>
      ) : (
        <p>Semestr není k dispozici.</p>
      )}

      <h3>Lekce v plánu</h3>
      <ul>
        {allLessons.length > 0 ? (
          allLessons.map((lesson, index) => (
            <li key={lesson.id || index}>
              {lesson.name || `Lekce #${index + 1}`}
            </li>
          ))
        ) : (
          <p>Žádné lekce</p>
        )}
      </ul>

      <h3>Skupiny studentů</h3>
      <ul>
        {uniqueGroups.length > 0 ? (
          uniqueGroups.map(group => (
            <li key={group.id}>{group.name}</li>
          ))
        ) : (
          <p>Žádné skupiny</p>
        )}
      </ul>

      <h3>Učebny</h3>
      <ul>
        {uniqueRooms.length > 0 ? (
          uniqueRooms.map(room => (
            <li key={room.id}>{room.name}</li>
          ))
        ) : (
          <p>Žádné učebny</p>
        )}
      </ul>

      <h3>Vyučující</h3>
      <ul>
        {uniqueInstructors.length > 0 ? (
          uniqueInstructors.map(instr => (
            <li key={instr.id}>{instr.name} {instr.surname}</li>
          ))
        ) : (
          <p>Žádní vyučující</p>
        )}
      </ul> 

      <h3>Zkoušky</h3>
      {studyplan.exam ? (
        <>
          <p><strong>ID:</strong> {studyplan.exam.id}</p>
          <p><strong>Lastchange:</strong> {studyplan.exam.lastchange}</p>
        </>
      ) : (
        <p>Žádná zkouška</p>
      )}

      <br />
      {children}
    </>
  );
};

