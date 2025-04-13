import { Input } from "@hrbolek/uoisfrontend-shared"

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
export const StudyplanMediumEditableContent = ({studyplan, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={studyplan?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={studyplan?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
