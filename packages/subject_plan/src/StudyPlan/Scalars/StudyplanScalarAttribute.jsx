/**
 * A component for displaying the `scalar` attribute of an studyplan entity.
 *
 * This component checks if the `scalar` attribute exists on the `studyplan` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyplanScalarAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.scalar] - The scalar attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <StudyplanScalarAttribute studyplan={studyplanEntity} />
 */
export const StudyplanScalarAttribute = ({studyplan}) => {
    const {scalar} = studyplan
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}