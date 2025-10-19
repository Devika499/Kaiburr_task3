import React from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
        }}
      >
        <AntApp>
          <Layout>
            <TaskList />
          </Layout>
        </AntApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
