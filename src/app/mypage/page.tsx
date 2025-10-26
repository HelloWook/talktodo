import MyPageForm from '@/components/MyPageForm/MyPageForm';
import SideBar from '@/components/SideBar/SideBar';

const MyPage = () => {
  return (
    <div className='gradient-bg flex h-screen items-center justify-center'>
      <SideBar userNickname='John Doe' userEmail='john.doe@example.com' goals={[]} />
      <MyPageForm />
    </div>
  );
};

export default MyPage;
