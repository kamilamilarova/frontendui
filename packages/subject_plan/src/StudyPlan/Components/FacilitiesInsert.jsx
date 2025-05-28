import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState, useRef, useEffect } from "react";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";

const InsertFacilityAsyncAction = createAsyncGraphQLAction(`query($pattern: String!){
  facilityPage(where:{name :{_ilike: $pattern}}) {
    __typename
    id
    name
  }
}`)

const FacilityUpdateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($planitemId: UUID!, $facilityId: UUID!) {
  studyPlanLessonAddFacility(
    studyPlanLesson: {planitemId: $planitemId, facilityId: $facilityId})
    {
    __typename
    }
    }`)



const LocalFacility = ({facility, onSelect}) => {
    const onClick = (e) => {
        e.preventDefault();
        console.log("LocalFacility.onClick", facility.id, facility.name)
        onSelect(facility)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{facility.name} [{facility.id}]</a>
        </div>
    )
}


export const FacilitiesInsert = ({ onChoose }) => {
    const {loading, error, fetch} = useAsyncAction(
        InsertFacilityAsyncAction,
        {},
        { deferred: true }
    );
    const {fetch: fetchFacilityUpdate, loading:facilityloading, error: facilityerror} = useAsyncAction(
        FacilityUpdateAsyncAction,
        {},
        { deferred: true }
    );
    const inputRef = useRef(null);
    const [facilities, setFacilities] = useState([]);
    const [delayer, setDelayer] = useState(() => CreateDelayer(500)); 

    const onSelect = async (facility) => {
        console.log("onSelect", facility.id, facility.name)
        onChoose(facility, fetchFacilityUpdate);
        setFacilities([]);
    }

    const onChange = (e) => {
        const data = e.target.value;
        if (data.length > 2) {
            delayer(() => fetch({ pattern: `%${data}%` }).then(
                json => {
                    const facilities = json?.data?.facilityPage || []
                    setFacilities(facilities);
                    return json;
                }
            ))
        } else {
            setFacilities([]);
        }
    }

    return (
        <div ref={inputRef}
            style={{
                backgroundColor: "white",
                zIndex: 1000,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                width: "400px",
            }}
        >
            {facilityloading && <div>Načítám...</div>}
            {facilityerror && <div style={{ color: "red" }}>Chyba: {facilityerror.message}</div>}
            <input
                type="text"
                defaultValue=""
                onChange={onChange}
                className="form-control"
                placeholder="Zadejte název místnosti"
            />
            {facilities &&
                facilities.map((facility) => (
                    <LocalFacility key={facility.id} facility={facility} onSelect={onSelect}/>
                ))}
        </div>
    )
}