'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

import Icon from '@/components/Icon/Icon';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import MenuGroup from './_components/MenuGroup';
import MenuItem from './_components/MenuItem';
import NewGoalButton from './_components/NewGoalButton';
import SidebarHeader from './_components/SidebarHeader';
import SidebarProfileSection from './_components/SidebarProfileSection';
import SidebarSeparator from './_components/SidebarSeparator';

interface SidebarContextType {
  isFold: boolean;
  toggleFold: () => void;
  isMobile: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar 컴포넌트는 SideBar 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

interface MobileSideBarProps {
  children: ReactNode;
  className?: string;
}

const MobileSideBar = ({ children, className }: MobileSideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/');
  };

  const handleLogoKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      router.push('/');
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SidebarContext.Provider value={{ isFold: false, toggleFold: () => {}, isMobile: true, isOpen, toggleOpen }}>
      <div ref={sidebarRef} className={cn('relative w-full', className)}>
        <button
          onClick={toggleOpen}
          className='flex w-full items-center justify-between bg-white px-5 py-4 shadow-[0px_0px_12px_0px_rgba(235,235,235,1.00)]'
        >
          <div className='flex items-center gap-3'>
            <div
              onClick={handleLogoClick}
              onKeyDown={handleLogoKeyDown}
              className='flex cursor-pointer items-center justify-center'
              role='button'
              tabIndex={0}
            >
              <Icon name='logo' className='h-8 w-8' />
            </div>
            <span className='font-body1-semibold text-gray-900'>메뉴</span>
          </div>
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M6 9L12 15L18 9' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </button>

        <div
          className={cn(
            'scrollbar-hide absolute right-0 left-0 z-50 max-h-[calc(100vh-80px)] overflow-y-auto rounded-b-[20px] bg-white shadow-[0px_0px_12px_0px_rgba(235,235,235,1.00)] transition-all duration-300',
            isOpen ? 'top-full opacity-100' : 'pointer-events-none top-[calc(100%-20px)] opacity-0',
          )}
        >
          <div className='flex flex-col p-5'>{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

interface DesktopSideBarProps {
  children: ReactNode;
  className?: string;
}

const DesktopSideBar = ({ children, className }: DesktopSideBarProps) => {
  const [isFold, setIsFold] = useState(false);

  const toggleFold = () => {
    setIsFold(!isFold);
  };

  return (
    <SidebarContext.Provider value={{ isFold, toggleFold, isMobile: false, isOpen: false, toggleOpen: () => {} }}>
      <aside className={cn('h-full p-5', className)}>
        <div
          className={`scrollbar-hide relative box-border flex h-full flex-col items-center justify-between ${!isFold && 'overflow-y-scroll'} rounded-[20px] bg-white shadow-[0px_0px_12px_0px_rgba(235,235,235,1.00)] transition-all duration-300 ${isFold ? 'w-20' : 'w-64'}`}
        >
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

// 메인 SideBar 컴포넌트
const SideBar = ({ children, className }: SidebarProps) => {
  const isMobile = useMediaQuery('(max-width: 1280px)');

  return isMobile ? (
    <MobileSideBar className={className}>{children}</MobileSideBar>
  ) : (
    <DesktopSideBar className={className}>{children}</DesktopSideBar>
  );
};

interface ContentProps {
  children: ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  const { isFold, isMobile } = useSidebar();
  return (
    <div className={cn(`box-border flex w-full flex-1 flex-col ${isMobile ? 'px-0' : isFold ? `px-3` : `px-5`} `, className)}>
      {children}
    </div>
  );
};

interface FooterProps {
  children: ReactNode;
  className?: string;
}

const Footer = ({ children, className }: FooterProps) => {
  const { isMobile } = useSidebar();
  return <div className={cn(`box-border h-[120px] w-full ${isMobile ? 'p-0' : 'p-5'}`, className)}>{children}</div>;
};

SideBar.Content = Content;
SideBar.Footer = Footer;
SideBar.Header = SidebarHeader;
SideBar.MenuGroup = MenuGroup;
SideBar.MenuItem = MenuItem;
SideBar.ProfileSection = SidebarProfileSection;
SideBar.Separator = SidebarSeparator;
SideBar.NewGoalButton = NewGoalButton;

export default SideBar;
