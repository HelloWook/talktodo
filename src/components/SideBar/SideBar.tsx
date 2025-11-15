'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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

const SideBar = ({ children, className }: SidebarProps) => {
  const [isFold, setIsFold] = useState(false);

  const toggleFold = () => {
    setIsFold(!isFold);
  };

  return (
    <SidebarContext.Provider value={{ isFold, toggleFold }}>
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

interface ContentProps {
  children: ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  const { isFold } = useSidebar();
  return <div className={cn(`box-border flex w-full flex-1 flex-col ${isFold ? `px-3` : `px-5`} `, className)}>{children}</div>;
};

interface FooterProps {
  children: ReactNode;
  className?: string;
}

const Footer = ({ children, className }: FooterProps) => {
  return <div className={cn('box-border h-[120px] w-full p-5', className)}>{children}</div>;
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
