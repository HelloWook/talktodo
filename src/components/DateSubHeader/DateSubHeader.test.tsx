import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateSubHeader from './DateSubHeader';

interface MockToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  icons?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
}

interface MockIconProps {
  name: string;
}

interface MockDateSelectorProps {
  onDateChange?: (date: Date) => void;
}

// Mock Toggle component
jest.mock('../Toggle/Toggle', () => {
  return function MockToggle({ checked, onChange, icons }: MockToggleProps) {
    return (
      <div data-testid='toggle'>
        <button data-testid='toggle-button' onClick={() => onChange?.(!checked)}>
          Toggle {checked ? 'On' : 'Off'}
        </button>
        {icons?.left && <div data-testid='toggle-icon-left'>{icons.left}</div>}
        {icons?.right && <div data-testid='toggle-icon-right'>{icons.right}</div>}
      </div>
    );
  };
});

// Mock Icon component
jest.mock('../Icon/Icon', () => {
  return function MockIcon({ name }: MockIconProps) {
    return <div data-testid={`icon-${name}`}>{name}</div>;
  };
});

// Mock DateSelector components
jest.mock('./_components/DateSelector', () => ({
  DateList: function MockDateList({ onDateChange }: MockDateSelectorProps) {
    return (
      <div data-testid='date-list'>
        <button data-testid='date-list-button' onClick={() => onDateChange?.(new Date('2024-03-21'))}>
          Change Date
        </button>
      </div>
    );
  },
  DatePickerButton: function MockDatePickerButton({ onDateChange }: MockDateSelectorProps) {
    return (
      <button data-testid='date-picker-button' onClick={() => onDateChange?.(new Date('2024-04-01'))}>
        DatePicker
      </button>
    );
  },
  formatFullDate: jest.fn((date: Date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`),
}));

describe('DateSubHeader', () => {
  const mockOnDateChange = jest.fn();
  const mockOnLayoutChange = jest.fn();
  const defaultProps = {
    selectedDate: new Date('2024-03-20'),
    onDateChange: mockOnDateChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('날짜 표시', () => {
    it('선택한 날짜를 표시한다', () => {
      render(<DateSubHeader {...defaultProps} />);

      expect(screen.getByText(/2024년 3월/)).toBeInTheDocument();
    });

    it('다른 날짜를 선택하면 표시된다', () => {
      const { rerender } = render(<DateSubHeader {...defaultProps} />);

      expect(screen.getByText(/2024년 3월/)).toBeInTheDocument();

      rerender(<DateSubHeader {...defaultProps} selectedDate={new Date('2025-12-25')} />);

      expect(screen.getByText(/2025년 12월/)).toBeInTheDocument();
    });
  });

  describe('컴포넌트 렌더링', () => {
    it('날짜 선택기를 렌더링한다', () => {
      render(<DateSubHeader {...defaultProps} />);

      expect(screen.getByTestId('date-picker-button')).toBeInTheDocument();
    });

    it('날짜 목록을 렌더링한다', () => {
      render(<DateSubHeader {...defaultProps} />);

      expect(screen.getByTestId('date-list')).toBeInTheDocument();
    });

    it('토글을 렌더링한다', () => {
      render(<DateSubHeader {...defaultProps} />);

      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('레이아웃 아이콘을 렌더링한다', () => {
      render(<DateSubHeader {...defaultProps} />);

      expect(screen.getByTestId('icon-layout1')).toBeInTheDocument();
      expect(screen.getByTestId('icon-layout2')).toBeInTheDocument();
    });
  });

  describe('날짜 변경', () => {
    it('DatePickerButton을 클릭하면 onDateChange가 호출된다', async () => {
      const user = userEvent.setup();
      render(<DateSubHeader {...defaultProps} />);

      await user.click(screen.getByTestId('date-picker-button'));

      expect(mockOnDateChange).toHaveBeenCalledWith(new Date('2024-04-01'));
    });

    it('DateList에서 날짜를 선택하면 onDateChange가 호출된다', async () => {
      const user = userEvent.setup();
      render(<DateSubHeader {...defaultProps} />);

      await user.click(screen.getByTestId('date-list-button'));

      expect(mockOnDateChange).toHaveBeenCalledWith(new Date('2024-03-21'));
    });
  });
});
