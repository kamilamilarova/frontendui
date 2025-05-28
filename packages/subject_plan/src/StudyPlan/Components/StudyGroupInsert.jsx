import { createAsyncGraphQLAction, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { useState, useRef, useEffect } from "react";
import { CreateDelayer} from "@hrbolek/uoisfrontend-shared";
import { useDispatch } from 'react-redux';

const QueryGroupAsyncAction = createAsyncGraphQLAction(`query ($pattern: String!){
  groupPage(where: {name :{_ilike: $pattern}}) {
    __typename
    id
    name
  }
}`)



const GroupUpdateAsyncAction = createAsyncGraphQLAction(`
mutation MyMutation($planitemId: UUID!, $groupId: UUID!) {
  studyPlanLessonAddGroup(
    studyPlanLesson: {planitemId: $planitemId, groupId: $groupId})
    {
    __typename
    }
    }
`)

const LocalGroup = ({group, onSelect}) => {
    const onClick = (e) => {
        e.preventDefault();
        console.log("LocalGroup.onClick", group.id, group.name)
        onSelect(group)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{group.name} [{group.id}]</a>
        </div>
    )
}





export const StudyGroupInsert = ({onChoose}) => {
  const {loading, error, fetch} = useAsyncAction(
    QueryGroupAsyncAction,
    {},
    { deferred: true }
  );
  const {fetch: fetchGroupUpdate, loading:grouploading, error: grouperror} = useAsyncAction(
      GroupUpdateAsyncAction,
    {},
    { deferred: true }
  );//tady bude mutace)

  const inputRef = useRef(null);
  const [groups, setGroups] = useState([]);
  const [delayer, setDelayer] = useState(() => CreateDelayer(500));

  const onSelect = async (group) => {
    
    console.log("onSelect", group.id, group.name)
    onChoose(group, fetchGroupUpdate);
        setGroups([]);
  }

   const onChange = (e) => {
  const data = e.target.value;
    if (data.length > 2) {
      delayer(() => fetch({ pattern: `%${data}%` }).then(
        json => {
          const groups = json?.data?.groupPage || []
          setGroups(groups);
          return json;
        }
      ))

    }
    else {
      setGroups([]);
    }
   }

  return (
        <div ref={inputRef}
        style={{
          backgroundColor: "white",
          zIndex: 1000, // Zajistí, že bude nad ostatními prvky
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        {grouploading && <div>Načítám...</div>}
        {grouperror && <div style={{ color: "red" }}>Chyba: {grouperror.message}</div>}
          <input
            type="text"
            defaultValue=""
            onChange={onChange}
            className="form-control"
            placeholder="Zadejte název skupiny"
          />
          {groups &&
            groups.map((group) => {
              return <LocalGroup key={group.id} group={group} onSelect={onSelect}/>; //TODO: define localgroup
          })}
      </div>
  )
}






  




