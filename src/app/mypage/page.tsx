import MenuSideBar from '@/components/MenuSideBar/MenuSideBar';
import MyPageForm from '@/components/MyPageForm/MyPageForm';

const MyPage = () => {
  return (
    <div className='gradient-bg flex h-screen items-center'>
      <MenuSideBar />

      <main className='relative mx-auto flex h-full w-full max-w-[800px] items-center justify-center'>
        <MyPageForm />
      </main>
    </div>
  );
};

export default MyPage;
