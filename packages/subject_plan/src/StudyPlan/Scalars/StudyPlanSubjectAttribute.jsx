/**
 * A component for displaying the `subject` attribute of an studyplan entity.
 *
 * This component checks if the `subject` attribute exists on the `studyplan` object. If `subject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `subject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyplanSubjectAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.subject] - The subject attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `subject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { subject: { id: 1, name: "Sample Subject" } };
 *
 * <StudyplanSubjectAttribute studyplan={studyplanEntity} />
 */
export const StudyplanSubjectAttribute = ({studyplan}) => {
    const {subject} = studyplan
    if (typeof subject === 'undefined') return null
    return (
        <>
            Probably {'<SubjectMediumCard subject=\{subject\} />'} <br />
            {JSON.stringify(subject)}
        </>
    )
}