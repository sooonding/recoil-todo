import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ErrorMsg = styled.span`
  color: red;
`;

/* export default function TodoList() {
  const [todo, setTodo] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={todo} onChange={onChange} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
} */

interface IForm {
  //NOTE: 받아오는 input name을 가져온다.
  todo: string;
  email: string;
  password: string;
  //필수항목이 아닌것
  password1: string;
  //전체 form에 대한 에러를 나타내기 위해 항목을 추가한다.
  extraError?: string;
  todo1?: string;
}

//ANCHOR : react-hook-form 사용

export default function FormLibrary() {
  //NOTE: error를 렌더하기위해 formState를 한번 더 구조분해 할당 합니다.
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    //NOTE: defaultValues는 해당 input의 기본값을 적어 놓은것
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    console.log(data, 'ADD');
    if (data.password !== data.password1) {
      setError('password1', { message: '패스워드가 동일하지 않습니다.' }, { shouldFocus: true });
    }
    //NOTE: 특정 항목에 해당하는 에러가 아닌 전체 form에 대한 에러
    // setError('extraError', { message: 'Server offline.' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} style={{ display: 'flex', flexDirection: 'column' }}>
        {/*
        NOTE: 특정단어에 대해 경고를 내고 싶다면 validate 함수를 사용한다.  
        validate 함수는 리턴값은 true/false이며 true면 검증이 통과된다.
        */}
        <input
          {...register('todo', {
            required: 'write here',
            validate: value =>
              value.includes('seongjin') ? 'seongjin은 포함할 수 없습니다.' : true,
          })}
          placeholder="input in value.."
        />
        <ErrorMsg>{errors?.todo?.message}</ErrorMsg>
        {/*
        NOTE: validate는 함수로 표현할 수 있지만 input에 많은 validation이 필요하다면 객체로도 가능
        */}
        <input
          {...register('todo1', {
            required: 'write here',
            validate: {
              noSeong: value => (value?.includes('seong') ? 'no word allowed' : true),
              noNick: value => (value?.includes('nick') ? 'no nick allow' : true),
            },
          })}
          placeholder="input in value.."
        />
        <ErrorMsg>{errors?.todo?.message}</ErrorMsg>

        <input
          {...register('password', {
            required: 'password is require',
            minLength: { value: 2, message: '5자 이하는 통과하지 못합니다.' },
          })}
          placeholder="password"
        />
        <ErrorMsg>{errors?.password?.message}</ErrorMsg>
        <input
          {...register('password1', {
            required: 'password is require',
            minLength: { value: 2, message: '5자 이하는 통과하지 못합니다.' },
          })}
          placeholder="password1"
        />
        <ErrorMsg>{errors?.password1?.message}</ErrorMsg>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: '해당 이메일 양식이 옳지 않습니다.',
            },
          })}
          placeholder="input in value.."
        />
        <ErrorMsg>{errors?.email?.message}</ErrorMsg>
        <button>Add</button>
        <ErrorMsg>{errors?.extraError?.message}</ErrorMsg>
      </form>
    </div>
  );
}
