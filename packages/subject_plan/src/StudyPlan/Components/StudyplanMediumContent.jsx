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
export const StudyplanMediumContent = ({studyplan, children}) => {
    return (
        <>
          <h2>Stránka studijního plánu</h2>
          <p><strong>Název:</strong> {studyplan.name}</p>
          <p><strong>Anglický název:</strong> {studyplan.nameEn || "Bez anglického názvu"}</p>
    
          <h3>Informace o semestru</h3>
          {studyplan.semester ? (
            <ul>
              <li><strong>Semestr:</strong> {studyplan.semester.order}</li>
              <li><strong>Předmět:</strong> {studyplan.semester.subject?.name}</li>
              <li><strong>Program:</strong> {studyplan.semester.subject?.program?.name}</li>
            </ul>
          ) : (
            <p>Semestr není k dispozici.</p>
          )}
    
          {studyplan.semester?.subject?.program && (
            <>
              <h4>Detail programu</h4>
              <StudyplanMediumCard program={studyplan.semester.subject.program} />
            </>
          )}
    
          <h3>Lekce v plánu</h3>
          <ul>
            {studyplan.lessons && studyplan.lessons.length > 0 ? (
              studyplan.lessons.map((lesson, index) => (
                <li key={index}>{lesson.topic?.name || `Lekce #${index + 1}`}</li>
              ))
            ) : (
              <p>Žádné lekce</p>
            )}
          </ul>
    
          <h3>Skupiny studentů</h3>
          <ul>
            {studyplan.lessons?.flatMap(l => l.studyGroups || []).map((group, index) => (
              <li key={index}>{group.name}</li>
            )) || <p>Žádné skupiny</p>}
          </ul>
    
          <h3>Učebny</h3>
          <ul>
            {studyplan.lessons?.flatMap(l => l.facilities || []).map((room, index) => (
              <li key={index}>{room.name}</li>
            )) || <p>Žádné učebny</p>}
          </ul>
    
          <h3>Vyučující</h3>
          <ul>
            {studyplan.lessons?.flatMap(l => l.instructors || []).map((i, index) => (
              <li key={index}>{i.name} {i.surname}</li>
            )) || <p>Žádní vyučující</p>}
          </ul>
    
          <br />
          {children}
        </>
      );
    };
    