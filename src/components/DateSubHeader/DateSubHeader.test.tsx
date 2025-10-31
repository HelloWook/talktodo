import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import DateSubHeader from './DateSubHeader';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

// Mock Toggle component
jest.mock('../Toggle/Toggle', () => {
  return function MockToggle() {
    return <div data-testid='toggle'>Toggle</div>;
  };
});

// Mock DateSelector components
jest.mock('./_components/DateSelector', () => ({
  DateList: function MockDateList() {
    return <div data-testid='date-list'>DateList</div>;
  },
  DatePickerButton: function MockDatePickerButton() {
    return <button data-testid='date-picker-button'>DatePicker</button>;
  },
  formatFullDate: jest.fn((date: Date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`),
  parseDateParam: jest.fn((param?: string) => {
    if (!param) return new Date('2024-01-15');
    return new Date(param);
  }),
}));

describe('DateSubHeader', () => {
  const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('선택한 날짜를 표시한다', () => {
    mockUseParams.mockReturnValue({ date: '2024-03-20' });

    render(<DateSubHeader />);

    expect(screen.getByText(/2024년 3월/)).toBeInTheDocument();
  });

  it('날짜가 없을 때 현재 날짜를 표시한다', () => {
    mockUseParams.mockReturnValue({});

    render(<DateSubHeader />);

    expect(screen.getByText(/2024년 1월/)).toBeInTheDocument();
  });

  it('날짜 선택기와 토글을 제공한다', () => {
    mockUseParams.mockReturnValue({ date: '2024-01-15' });

    render(<DateSubHeader />);

    expect(screen.getByTestId('date-picker-button')).toBeInTheDocument();
    expect(screen.getByTestId('date-list')).toBeInTheDocument();
    expect(screen.getByTestId('toggle')).toBeInTheDocument();
  });
});
