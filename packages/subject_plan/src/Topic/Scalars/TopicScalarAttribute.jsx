/**
 * A component for displaying the `scalar` attribute of an topic entity.
 *
 * This component checks if the `scalar` attribute exists on the `topic` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the TopicScalarAttribute component.
 * @param {Object} props.topic - The object representing the topic entity.
 * @param {*} [props.topic.scalar] - The scalar attribute of the topic entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const topicEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <TopicScalarAttribute topic={topicEntity} />
 */
export const TopicScalarAttribute = ({topic}) => {
    const {scalar} = topic
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}