import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, toDoSelectors } from '../atoms';
import CreateToDo from './CreateToDo';
import SelectForm from './SelectForm';
import ToDo from './ToDo';

export default function TodoList() {
  //   const [toDo, done, doing] = useRecoilValue(toDoSelectors); // return값은 배열
  const todos = useRecoilValue(toDoSelectors);

  /*
  NOTE: useRecoilState함수는 value modifier함수를 반환
  React State hook과 굉장히 비슷 value와 value변경함수를 둘 다 얻고 싶다면 useRecoilState hook을 사용하자
  */
  // 현재의 todo가 "ITodo 객체로 이루어진 배열"임을 알고있다.
  //   const [todos, setTodos] = useRecoilState(toDoState);

  //   //atom의 값을 불러오기
  //   const todos = useRecoilValue(toDoState);
  //   //atom 값을 수정하는 함수 불러오기
  //   const modFn = useSetRecoilState(toDoState);

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      {/* NOTE: value를 넣는 이유는 event.currentTarget.value를 할 때 해당값이 나온다.*/}
      {/* <select style={{ fontSize: '20px', margin: '20px' }} value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select> */}
      <SelectForm />
      <CreateToDo />

      {todos?.map(todo => {
        return <ToDo key={todo.id} {...todo} />;
      })}
    </div>
  );
}
