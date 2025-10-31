import { dialogService } from './dialogService';

// dialogService는 내부 구현이므로 핵심 기능만 테스트
describe('DialogService', () => {
  beforeEach(() => {
    dialogService.reset();
  });

  afterEach(() => {
    dialogService.reset();
  });

  it('다이얼로그를 열고 닫을 수 있다', () => {
    const content = <div>테스트 다이얼로그</div>;
    const id = dialogService.openDialog(content);

    expect(dialogService.getDialogs()).toHaveLength(1);

    dialogService.closeDialog(id);
    expect(dialogService.getDialogs()).toHaveLength(0);
  });

  it('여러 다이얼로그를 관리할 수 있다', () => {
    const id1 = dialogService.openDialog(<div>다이얼로그 1</div>);
    const id2 = dialogService.openDialog(<div>다이얼로그 2</div>);

    expect(dialogService.getDialogs()).toHaveLength(2);

    dialogService.closeDialog(id1);
    expect(dialogService.getDialogs()).toHaveLength(1);

    dialogService.closeAllDialogs();
    expect(dialogService.getDialogs()).toHaveLength(0);
  });

  it('onClose 콜백이 호출된다', () => {
    const onClose = jest.fn();
    const id = dialogService.openDialog(<div>테스트</div>, onClose);

    dialogService.closeDialog(id);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
