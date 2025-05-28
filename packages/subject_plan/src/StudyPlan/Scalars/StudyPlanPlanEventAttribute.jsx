/**
 * A component for displaying the `planevent` attribute of an studyplan entity.
 *
 * This component checks if the `planevent` attribute exists on the `studyplan` object. If `planevent` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `planevent` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyplanPlaneventAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.planevent] - The planevent attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `planevent` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { planevent: { id: 1, name: "Sample Planevent" } };
 *
 * <StudyplanPlaneventAttribute studyplan={studyplanEntity} />
 */
export const StudyplanPlaneventAttribute = ({studyplan}) => {
    const {planevent} = studyplan
    if (typeof planevent === 'undefined') return null
    return (
        <>
            Probably {'<PlaneventMediumCard planevent=\{planevent\} />'} <br />
            {JSON.stringify(planevent)}
        </>
    )
}