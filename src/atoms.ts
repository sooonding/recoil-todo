import { atom, selector } from 'recoil';

// NOTE: type이라는 건 기본적으로 재사용이 가능
type categories = 'TO_DO' | 'DOING' | 'DONE';

//NOTE: enum: 실제로 그냥 TO_DO로만 하면 숫자 0이 출력된다.
// export enum Categories {
//   'TO_DO',
//   'DOING',
//   'DONE',
// }

//NOTE: value값을 숫자로 받지 않기 위해 할당 지정을 해준다.
export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
export interface ITodo {
  text: string;
  // 제한된 타입만 받을 수 있도록 적용
  //   category: 'TO_DO' | 'DOING' | 'DONE';
  category: Categories;
  id: number;
}

//NOTE: categoryState의 타입이 세개 중 하나라고 명시
export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

//NOTE: localStorage logic
export const TODO = 'TODO';

const localStorageTodo: ITodo[] | [] = JSON.parse(localStorage.getItem('TODO') as string) || [];

export const toDoState = atom<ITodo[]>({
  key: 'toDo',
  default: localStorageTodo,
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
