import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";

const QueryStudentAsyncAction = createAsyncGraphQLAction(`query QueryInstructor($pattern: String!) {
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

const StudentInsertAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($userId: UUID!, $programId: UUID!, $stateId: UUID!, $id: UUID) {
  studentInsert(
    student: {userId: $userId, programId: $programId, stateId: $stateId, id: $id}
  ) {
    __typename
    ... on StudentGQLModel {
      id
      student {
        id
        name
        surname
      }
    }
    ... on InsertError {
      input
      failed
      msg
    }
  }
}`)

const EvaluationInsertAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($studentId: UUID!, $examId: UUID!, $passed: Boolean!, $points: Int!, $id: UUID) {
  evaluationInsert(
    evaluation: {studentId: $studentId, passed: $passed, points: $points, examId: $examId, id: $id}
  ) {
    __typename
    ... on EvaluationGQLModel {
      id
    }
    ... on InsertError {
      input
      failed
      msg
    }
  }
}`)

const LocalStudent = ({ user, onSelect }) => {
    const onClick = (e) => {
        e.preventDefault();
        console.log("LocalStudent.onClick", user.id, user.name)
        onSelect(user)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{user.fullname}</a>
        </div>
    )
}


export const StudentEvaluationInsert = ({ examId, programId, onDone, readOnly }) => {
  const [pattern, setPattern] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [points, setPoints] = useState("");
  const [passed, setPassed] = useState(false);

  const { fetch: fetchUsers, loading: loadingUsers } = useAsyncAction(
    QueryStudentAsyncAction,
    {},
    { deferred: true }
  );
  const { fetch: insertStudent } = useAsyncAction(StudentInsertAsyncAction, {}, { deferred: true });
  const { fetch: insertEvaluation } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deferred: true });

  // Vyhledávání uživatelů při změně patternu
  const handlePatternChange = async (e) => {
    const value = e.target.value;
    setPattern(value);
    console.log("Zadán pattern:", value);
    if (value.length > 0) {
      const result = await fetchUsers({ pattern: `%${value}%` });
      console.log("Výsledek fetchUsers:", result);
      setUsers(result?.data?.userPage ?? []);
    } else {
      setUsers([]);
    }
  };

  // Po kliknutí na uživatele
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    console.log("Kliknuto na uživatele:", user);
    try {
      const studentResult = await insertStudent({
        userId: user.id,
        programId,
        stateId:  "bdf5169a-c2f1-4bc2-923b-1eefd941e261",
        id: crypto.randomUUID()
      });
      console.log("Výsledek insertStudent:", studentResult);
      if (studentResult?.id) {
        const evaluationResult = await insertEvaluation({
          studentId: studentResult.id,
          examId,
          passed: false,
          points: 0,
          id: crypto.randomUUID()
        });
        console.log("Výsledek insertEvaluation:", evaluationResult);
        if (evaluationResult?.id) {
          //alert("Evaluation úspěšně vytvořena!");
          onDone?.(evaluationResult);
          setPattern("");
          setSelectedUser(null);
          setPoints("");
          setPassed(false);
          setUsers([]);
        } else {
          alert("Nepodařilo se vytvořit evaluation.");
        }
      } else {
        alert("Nepodařilo se vytvořit studenta.");
      }
    } catch (err) {
      console.error("Chyba při vkládání:", err);
      alert("Chyba při vkládání.");
    }
  };

  if (readOnly) {
    return null; // V režimu readOnly neukazujeme pole pro přidání
  }

  return (
    <div>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Hledat uživatele"
        value={pattern}
        onChange={handlePatternChange}
      />
      {pattern && users.length > 0 && (
        <ul className="list-group mb-2" style={{ maxHeight: 200, overflowY: "auto" }}>
          {users.map(user => (
            <li
              key={user.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer", padding: 0 }}
            >
              <LocalStudent user={user} onSelect={handleUserClick} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};