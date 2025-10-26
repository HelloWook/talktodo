import MyPageForm from '@/components/MyPageForm/MyPageForm';
import SideBar from '@/components/SideBar/SideBar';

const MyPage = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-white'>
      <SideBar userNickname='John Doe' userEmail='john.doe@example.com' goals={[]} />
      <MyPageForm />
    </div>
  );
};

export default MyPage;
