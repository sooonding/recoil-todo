import React from 'react';
import { useSetRecoilState } from 'recoil';
import { ITodo, toDoState } from '../atoms';

export default function ToDo({ text, category, id }: ITodo) {
  const setTodo = useSetRecoilState(toDoState);

  //NOTE: category를 변경하는 함수 interface인 ITodo의 카테고리타입을 가져옴
  //   const onClick = (newCategory: ITodo['category']) => {};

  //NOTE: name을 적어줌으로 해당 네임을 받아오는 함수
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodo(oldTodo => {
      const findTodo = oldTodo.findIndex(todo => id === todo.id);
      //NOTE: as any는 타입스크립트에게 체크하지 말라는 말
      const newTodo = { text, category: name as ITodo['category'], id };
      const result = [...oldTodo.slice(0, findTodo), newTodo, ...oldTodo.slice(findTodo + 1)];
      return result;

      // ANCHOR: splice로 처리할수도 있다.
      //   const copyArr = [...oldTodo];
      //   copyArr.splice(findTodo, 1, newTodo);
      //   return copyArr;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          To do
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onClick}>
          done
        </button>
      )}
      {category !== 'DOING' && (
        <button name="DOING" onClick={onClick}>
          doing
        </button>
      )}
    </li>
  );
}
