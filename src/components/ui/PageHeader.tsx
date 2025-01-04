import React from 'react';

interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

const PageHeader = ({ title, action }: PageHeaderProps) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold">{title}</h1>
    {action}
  </div>
);

export default PageHeader;