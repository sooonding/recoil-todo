import React from 'react';
import { useForm } from 'react-hook-form';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, ITodo, TODO, toDoState } from '../atoms';

export interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  //state 수정함수만 필요
  const setTodos = useSetRecoilState(toDoState);
  const todos = useRecoilValue(toDoState);
  const cate = useRecoilValue(categoryState);

  console.log([...todos], '[]TODOS');
  const onSubmit = (data: IForm) => {
    /* NOTE: 
     atom 수정함수는 두개의 동작을 할 수 있다.
     1. state를 직접 수정하는 방법
     2. 함수를 사용 함수의 리턴값이 새로운 state가 된다.
     기존의 setState처럼 불변성을 유지해줘야 한다.
     */
    const newTodo = { text: data.toDo, category: cate, id: Date.now() };
    setTodos(oldTodo => [{ text: data.toDo, category: cate, id: Date.now() }, ...oldTodo]);
    setValue('toDo', '');
    localStorage.setItem(TODO, JSON.stringify([...todos, newTodo]));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('toDo', { required: '할 일을 적어주세요' })}
        placeholder="할 일을 기입해 주세요"
        type="text"
      />
      <span>{errors?.toDo?.message}</span>
      <button>Add</button>
    </form>
  );
}
