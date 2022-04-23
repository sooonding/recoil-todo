import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoSelectors, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

export default function TodoList() {
  //   const [toDo, done, doing] = useRecoilValue(toDoSelectors); // return값은 배열
  const [category, setCategory] = useRecoilState(categoryState);
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

  //NOTE: select option의 변화 감지 함수
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  console.log(todos, 'todos');
  console.log(category, 'category');

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      {/* NOTE: value를 넣는 이유는 event.currentTarget.value를 할 때 해당값이 나온다.*/}
      <select style={{ fontSize: '20px', margin: '20px' }} value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {todos?.map(todo => {
        return <ToDo key={todo.id} {...todo} />;
      })}
      {/* {category === "TO_DO" && toDo.map(todo => )}
      {category === "DOING" && doing.map(todo => )}
      {category === "DONE" && done.map(todo => )} */}
    </div>
  );
}
