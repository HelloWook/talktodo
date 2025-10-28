import { render } from '@testing-library/react';

import MyPageForm from './MyPageForm';

describe('MyPageForm', () => {
  it('마이 페이지 폼이 렌더링 된다.', () => {
    render(<MyPageForm />);
  });
});
