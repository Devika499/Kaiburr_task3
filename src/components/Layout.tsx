import React from 'react';
import { Layout as AntLayout, Typography, Space } from 'antd';
import { TagsOutlined } from '@ant-design/icons';

const { Header, Content } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          background: '#fff', 
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Space align="center">
          <TagsOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            Task Manager
          </Title>
        </Space>
      </Header>
      <Content 
        style={{ 
          padding: '24px',
          background: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;
