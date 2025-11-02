import MyPageForm from '@/components/MyPageForm/MyPageForm';
import SideBar from '@/components/SideBar/SideBar';

const MyPage = () => {
  return (
    <div className='gradient-bg flex h-screen items-center'>
      <SideBar userNickname='John Doe' userEmail='john.doe@example.com' goals={[]} />

      <main className='relative mx-auto flex h-full w-full max-w-[800px] items-center justify-center'>
        <MyPageForm />
      </main>
    </div>
  );
};

export default MyPage;
