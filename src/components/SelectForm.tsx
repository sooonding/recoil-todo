import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, toDoSelectors } from '../atoms';

export default function SelectForm() {
  const [category, setCategory] = useRecoilState(categoryState);

  //NOTE: select option의 변화 감지 함수
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <>
      <select style={{ fontSize: '20px', margin: '20px' }} value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
    </>
  );
}
