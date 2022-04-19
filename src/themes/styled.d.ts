// import original module declarations
import 'styled-components';

//NOTE: 나의 styled component의 테마를 정의
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
  }
}
