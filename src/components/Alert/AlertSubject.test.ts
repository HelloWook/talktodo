import { AlertSubject } from './AlertSubject';

describe('AlertSubject', () => {
  let alertSubject: AlertSubject;

  beforeEach(() => {
    // 각 테스트 전에 새로운 인스턴스 생성
    alertSubject = AlertSubject.getInstance();
  });

  it('싱글톤 패턴이 올바르게 작동한다.', () => {
    const instance1 = AlertSubject.getInstance();
    const instance2 = AlertSubject.getInstance();

    expect(instance1).toBe(instance2);
  });

  it('observer를 구독하고 해제할 수 있다.', () => {
    const mockObserver = jest.fn();

    alertSubject.subscribe(mockObserver);
    expect(alertSubject['observers']).toContain(mockObserver);

    alertSubject.unsubscribe(mockObserver);
    expect(alertSubject['observers']).not.toContain(mockObserver);
  });

  it('알림을 추가하면 observer들에게 알림이 전달된다.', () => {
    const mockObserver = jest.fn();
    alertSubject.subscribe(mockObserver);

    const testAlert = {
      id: 1,
      message: '테스트 알림',
      handleClick: jest.fn(),
    };

    alertSubject.addAlert(testAlert);

    expect(mockObserver).toHaveBeenCalledWith(testAlert);
  });

  it('특정 ID로 알림을 제거할 수 있다.', () => {
    const testAlert = {
      id: 1,
      message: '테스트 알림',
      handleClick: jest.fn(),
    };

    alertSubject.addAlert(testAlert);
    expect(alertSubject['currentAlerts']).toContain(testAlert);

    alertSubject.removeAlert(1);
    expect(alertSubject['currentAlerts']).not.toContain(testAlert);
  });

  it('ID 없이 removeAlert를 호출하면 모든 알림이 제거된다.', () => {
    const testAlert1 = { id: 1, message: '알림1', handleClick: jest.fn() };
    const testAlert2 = { id: 2, message: '알림2', handleClick: jest.fn() };

    alertSubject.addAlert(testAlert1);
    alertSubject.addAlert(testAlert2);

    expect(alertSubject['currentAlerts']).toHaveLength(2);

    alertSubject.removeAlert();
    expect(alertSubject['currentAlerts']).toHaveLength(0);
  });
});
