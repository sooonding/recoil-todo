import { atom, selector } from 'recoil';

export interface ITodo {
  text: string;
  // 제한된 타입만 받을 수 있도록 적용
  category: 'TO_DO' | 'DOING' | 'DONE';
  id: number;
}

export const toDoState = atom<ITodo[]>({
  key: 'toDo',
  default: [],
});

export const categoryState = atom({
  key: 'category',
  default: 'TO_DO',
});

//NOTE: 한번에 해당 카테고리 데이터를 다 받는 것
export const toDoSelectors = selector({
  key: 'toDoSelect',
  get: ({ get }) => {
    //   NOTE: get을 이용하여 selector의 내부로 atom을 가져올 수 있다.
    const toDos = get(toDoState);
    const category = get(categoryState);
    // return [
    //   toDos.filter(item => item.category === 'TO_DO'),
    //   toDos.filter(item => item.category === 'DOING'),
    //   toDos.filter(item => item.category === 'DONE'),
    // ];
    return toDos.filter(item => item.category === category);
  },
});
