/**
 * A component for displaying the `topic` attribute of an studyplan entity.
 *
 * This component checks if the `topic` attribute exists on the `studyplan` object. If `topic` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `topic` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyplanTopicAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.topic] - The topic attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `topic` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { topic: { id: 1, name: "Sample Topic" } };
 *
 * <StudyplanTopicAttribute studyplan={studyplanEntity} />
 */
export const StudyplanTopicAttribute = ({studyplan}) => {
    const {topic} = studyplan
    if (typeof topic === 'undefined') return null
    return (
        <>
            Probably {'<TopicMediumCard topic=\{topic\} />'} <br />
            {JSON.stringify(topic)}
        </>
    )
}