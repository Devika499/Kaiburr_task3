import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'default', 
  text = 'Loading...' 
}) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }}>
      <Spin 
        size={size} 
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
      />
      <Text type="secondary">{text}</Text>
    </div>
  );
};

export default LoadingSpinner;
