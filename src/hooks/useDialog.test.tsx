import { renderHook, act, waitFor } from '@testing-library/react';

import { dialogService } from '@/components/DialogManager/dialogService';

import { useDialog } from './useDialog';

// useDialog는 실제 사용자가 사용하는 API이므로 충분히 테스트
describe('useDialog', () => {
  beforeEach(() => {
    dialogService.reset();
  });

  afterEach(() => {
    dialogService.reset();
  });

  describe('기본 기능', () => {
    it('다이얼로그를 열고 닫을 수 있다', async () => {
      const { result } = renderHook(() => useDialog());

      let dialogId = '';
      act(() => {
        dialogId = result.current.openDialog(<div>테스트</div>);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(1);
      });

      act(() => {
        result.current.closeDialog(dialogId);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(0);
      });
    });

    it('여러 다이얼로그를 동시에 열 수 있다', async () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog(<div>다이얼로그 1</div>);
        result.current.openDialog(<div>다이얼로그 2</div>);
        result.current.openDialog(<div>다이얼로그 3</div>);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(3);
      });
    });

    it('특정 다이얼로그만 닫을 수 있다', async () => {
      const { result } = renderHook(() => useDialog());

      let id1 = '';
      let id2 = '';

      act(() => {
        id1 = result.current.openDialog(<div>다이얼로그 1</div>);
        id2 = result.current.openDialog(<div>다이얼로그 2</div>);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(2);
      });

      act(() => {
        result.current.closeDialog(id1);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(1);
        expect(result.current.dialogs[0].id).toBe(id2);
      });
    });

    it('모든 다이얼로그를 한 번에 닫을 수 있다', async () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog(<div>다이얼로그 1</div>);
        result.current.openDialog(<div>다이얼로그 2</div>);
        result.current.openDialog(<div>다이얼로그 3</div>);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(3);
      });

      act(() => {
        result.current.closeAllDialogs();
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(0);
      });
    });
  });

  describe('콜백', () => {
    it('다이얼로그가 닫힐 때 onClose 콜백이 호출된다', async () => {
      const { result } = renderHook(() => useDialog());
      const onClose = jest.fn();

      let dialogId = '';
      act(() => {
        dialogId = result.current.openDialog(<div>테스트</div>, onClose);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(1);
      });

      act(() => {
        result.current.closeDialog(dialogId);
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('closeAllDialogs 시 모든 onClose 콜백이 호출된다', async () => {
      const { result } = renderHook(() => useDialog());
      const onClose1 = jest.fn();
      const onClose2 = jest.fn();

      act(() => {
        result.current.openDialog(<div>다이얼로그 1</div>, onClose1);
        result.current.openDialog(<div>다이얼로그 2</div>, onClose2);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(2);
      });

      act(() => {
        result.current.closeAllDialogs();
      });

      await waitFor(() => {
        expect(onClose1).toHaveBeenCalledTimes(1);
        expect(onClose2).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('엣지 케이스', () => {
    it('존재하지 않는 ID로 닫기를 시도해도 에러가 발생하지 않는다', async () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog(<div>테스트</div>);
      });

      await waitFor(() => {
        expect(result.current.dialogs).toHaveLength(1);
      });

      expect(() => {
        act(() => {
          result.current.closeDialog('non-existent-id');
        });
      }).not.toThrow();

      expect(result.current.dialogs).toHaveLength(1);
    });

    it('빈 상태에서 closeAllDialogs를 호출해도 에러가 발생하지 않는다', () => {
      const { result } = renderHook(() => useDialog());

      expect(() => {
        act(() => {
          result.current.closeAllDialogs();
        });
      }).not.toThrow();
    });
  });
});
