/**
 * 이메일에서 맨 뒤의 @도메인.com 패턴을 제거합니다.
 * @param email - 처리할 이메일 주소
 * @returns 맨 뒤의 @도메인.com이 제거된 이메일 주소
 * @example
 * formatEmail('wookgod01@naver.com@google.com') // 'wookgod01@naver.com'
 * formatEmail('wookgod01@naver.com@naver.com') // 'wookgod01@naver.com'
 * formatEmail('u29608737@gmail.com@kakao.com') // 'u29608737@gmail.com'
 */
export const formatEmail = (email: string | null | undefined): string => {
  if (!email) return 'user';

  // 맨 뒤의 @도메인.com 패턴 제거 (정규식으로 매칭)
  const emailPattern = /@[^@]+\.com$/;
  const match = email.match(emailPattern);

  if (match && email.split('@').length > 2) {
    // @가 2개 이상인 경우 (중복 도메인이 있는 경우)
    // 마지막 @도메인.com 제거
    return email.replace(/@[^@]+\.com$/, '');
  }

  return email;
};
