import React, { useState } from 'react';
import { Button, Card, Typography, Space, Alert } from 'antd';
import { taskApi } from '../services/api';

const { Title, Text } = Typography;

const CorsTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      const data = await taskApi.getAllTasks();
      setTestResult(`✅ Success! Found ${data.length} tasks. CORS is working correctly.`);
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        setTestResult('❌ Network Error: Backend is not running or CORS is not configured.');
      } else if (error.response?.status === 404) {
        setTestResult('❌ 404 Error: Backend endpoint not found.');
      } else {
        setTestResult(`❌ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>Backend Connection Test</Title>
        <Text type="secondary">
          Test if the backend is running and CORS is properly configured.
        </Text>
        <Button 
          type="primary" 
          onClick={testConnection} 
          loading={loading}
        >
          Test Connection
        </Button>
        {testResult && (
          <Alert
            message={testResult}
            type={testResult.includes('✅') ? 'success' : 'error'}
            showIcon
          />
        )}
      </Space>
    </Card>
  );
};

export default CorsTest;
