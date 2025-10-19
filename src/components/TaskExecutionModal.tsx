import React from 'react';
import {
  Modal,
  Table,
  Typography,
  Tag,
  Space,
  Card,
  Row,
  Col,
  Divider,
  Empty,
  Badge,
} from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Task, TaskExecution } from '../types';

const { Title, Text } = Typography;

interface TaskExecutionModalProps {
  visible: boolean;
  onCancel: () => void;
  task: Task | null;
}

const TaskExecutionModal: React.FC<TaskExecutionModalProps> = ({
  visible,
  onCancel,
  task,
}) => {
  if (!task) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const getExecutionDuration = (startTime: string, endTime: string) => {
    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const duration = end.getTime() - start.getTime();
      return `${(duration / 1000).toFixed(2)}s`;
    } catch {
      return 'N/A';
    }
  };

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined />
          <Text>{formatDate(text)}</Text>
        </Space>
      ),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined />
          <Text>{formatDate(text)}</Text>
        </Space>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_: any, record: TaskExecution) => (
        <Tag color="blue">
          {getExecutionDuration(record.startTime, record.endTime)}
        </Tag>
      ),
    },
    {
      title: 'Output Length',
      key: 'outputLength',
      render: (_: any, record: TaskExecution) => (
        <Badge
          count={`${record.output?.length || 0} chars`}
          style={{ backgroundColor: '#52c41a' }}
        />
      ),
    },
  ];

  const expandedRowRender = (record: TaskExecution) => (
    <Card size="small" style={{ margin: '8px 0' }}>
      <Title level={5}>Command Output</Title>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '12px',
          borderRadius: '4px',
          fontSize: '12px',
          maxHeight: '300px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {record.output || 'No output available'}
      </pre>
    </Card>
  );

  return (
    <Modal
      title={
        <Space>
          <PlayCircleOutlined />
          <Title level={4} style={{ margin: 0 }}>
            Task Executions: {task.name}
          </Title>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      destroyOnHidden
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card size="small">
          <Row gutter={16}>
            <Col span={8}>
              <Text strong>Task ID:</Text>
              <br />
              <Text code>{task.id}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Owner:</Text>
              <br />
              <Tag color="blue">{task.owner}</Tag>
            </Col>
            <Col span={8}>
              <Text strong>Total Executions:</Text>
              <br />
              <Badge count={task.taskExecutions.length} color="green" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Text strong>Command:</Text>
              <br />
              <Text code style={{ fontSize: '14px' }}>
                {task.command}
              </Text>
            </Col>
          </Row>
        </Card>

        <Card>
          <Title level={5}>Execution History</Title>
          {task.taskExecutions.length === 0 ? (
            <Empty
              description="No executions yet"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <Table
              columns={columns}
              dataSource={task.taskExecutions.map((execution, index) => ({
                ...execution,
                key: index,
              }))}
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} executions`,
              }}
              expandable={{
                expandedRowRender,
                rowExpandable: (record) => !!record.output,
              }}
              size="small"
            />
          )}
        </Card>
      </Space>
    </Modal>
  );
};

export default TaskExecutionModal;
