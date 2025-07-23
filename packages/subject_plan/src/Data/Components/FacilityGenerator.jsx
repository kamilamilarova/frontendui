import { useAsyncAction, createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared"
import { Button, Form } from "react-bootstrap"
import { useState } from "react"



/**
 * FacilityGenerator Component
 * 
 * Tato komponenta umožňuje vytvořit náhodnou fakultu (facility)
 * pomocí GraphQL mutace. Zobrazuje výsledek operace v tabulce.
 * 
 * @component
 * @returns {JSX.Element}
 * 
 * 
 * 
 */
const FacilityInsertAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($name: String!, $id: UUID!) {
  facilityInsert(facility: {name: $name, id: $id}) {
    __typename
    ...InsertFacility
  }
}

fragment InsertFacility on FacilityGQLModel {
  id
  name
}`)

export const FacilityGenerator = () => {
    const { fetch: fetchFacilityInsert } = useAsyncAction(FacilityInsertAsyncAction, {}, { deffered: true });
    const [facility, setFacility] = useState(null);
    const [facilityName, setFacilityName] = useState('');

    const generateRandomFacilityName = () => {
        const names = ["Library", "Gym", "Auditorium", "Cafeteria", "Laboratory"];
        return names[Math.floor(Math.random() * names.length)];
    };

    const generateFacility = async () => {
        const name = facilityName || generateRandomFacilityName();
        const id = crypto.randomUUID(); // Generuje náhodné UUID pro novou fakultu

        try {
            const result = await fetchFacilityInsert({ id, name });
            setFacility(result);
        } catch (error) {
            console.error("Chyba při generování facility:", error);
        }
    };

    const keyLabels = {
        id: "ID",
        name: "Název",
    };

    return (
        <div style={{ maxWidth: 600, margin: "32px auto", padding: 24, background: "#f8f9fa", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 24 }}>
                <Form.Group>
                    <Form.Label>Název facility</Form.Label>
                    <Form.Control
                        type="text"
                        value={facilityName}
                        onChange={(e) => setFacilityName(e.target.value)}
                        placeholder="Zadej název nebo nechej prázdné pro náhodný"
                    />
                </Form.Group>
                <Button onClick={generateFacility}>
                    Generovat facility
                </Button>
            </div>
            {facility && (
                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: 20, marginBottom: 32 }}>
                    <h4 style={{ color: "#1976d2", marginBottom: 16 }}>Facility</h4>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table table-bordered" style={{ background: "#fafdff", borderRadius: 8, minWidth: 400 }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%", whiteSpace: 'nowrap' }}>Popis</th>
                                    <th style={{ width: "35%", whiteSpace: 'nowrap' }}>Hodnota</th>
                                    <th style={{ width: "35%", whiteSpace: 'nowrap' }}>Klíč</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(facility).map(([key, value]) => (
                                    <tr key={key}>
                                        <th style={{ background: "#f0f4fa", fontWeight: 600, whiteSpace: 'nowrap' }}>{keyLabels[key] || key}</th>
                                        <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 0 }}>{String(value)}</td>
                                        <td style={{ color: "#888", fontStyle: "italic", whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 0 }}>{key}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};