import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState, useRef } from "react";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";


const QueryInstructorAsyncAction = createAsyncGraphQLAction(`query QueryInstructor($pattern: String!) {
  userPage(
    where: {
      _or: [
        { name: { _ilike: $pattern } },
        { surname: { _ilike: $pattern } }
      ]
    }
  ) {
    __typename
    id
    name
    surname
    fullname
  }
}`)

const LessonUpdateAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($planitemId: UUID!, $userId: UUID!) {
  studyPlanLessonAddInstructor(
    studyPlanLesson: {planitemId: $planitemId, userId: $userId}
  ) {
    __typename
  }
}`)

const LocalInstructor = ({ user, onSelect }) => {
    const onClick = (e) => {
        e.preventDefault();
        console.log("LocalInstructor.onClick", user.id, user.name)
        onSelect(user)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{user.fullname}</a>
        </div>
    )
}

export const InstructorInsert = ({onChoose, readOnly}) => {
    const { loading, error, fetch } = useAsyncAction(
        QueryInstructorAsyncAction,
        {},
        { deferred: true }
    );

    const {fetch: fetchLessonUpdate, loading:lessonloading, error: lessonerror} = useAsyncAction(
          LessonUpdateAsyncAction,
        {},
        { deferred: true }
      );
    const inputRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [delayer, setDelayer] = useState(() => CreateDelayer(500));

    const onSelect = async (user) => {
        onChoose(user, fetchLessonUpdate);
        setUsers([]);
        if (inputRef.current) {
            inputRef.current.value = ""; // Vyprázdní input
        }
    }
    const onChange = (e) => {
        const data = e.target.value;
        if (data.length > 2) {
            delayer(() => fetch({ pattern: `%${data}%` }).then(
                json => {
                    const users = json?.data?.userPage || []
                    setUsers(users);
                    return json;
                }
            ))

        }
        else {
            setUsers([]);
        }
    }
    
    if (readOnly) {
        return null; // Pokud je readOnly, nic nezobrazíme
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
            {lessonloading && <div>Načítám...</div>}
            {lessonerror && <div style={{ color: "red" }}>Chyba: {lessonerror.message}</div>}
            <input
                type="text"
                defaultValue=""
                onChange={onChange}
                className="form-control"
                placeholder="Zadejte jméno instruktora"
                ref={inputRef}
            />
            {users &&
                users.map((user) => {
                    return <LocalInstructor key={user.id} user={user} onSelect={onSelect} />; //TODO: define localgroup
                })}
        </div>
    )

}
