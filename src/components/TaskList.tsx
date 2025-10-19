import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Popconfirm,
  Card,
  Tag,
  Typography,
  Row,
  Col,
  Tooltip,
  Badge,
  Empty,
  App
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { Task } from '../types';
import { taskApi } from '../services/api';
import TaskForm from './TaskForm';
import TaskExecutionModal from './TaskExecutionModal';
import CorsTest from './CorsTest';

const { Search } = Input;
const { Title, Text } = Typography;

const TaskList: React.FC = () => {
  const { message } = App.useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [executionModalVisible, setExecutionModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      message.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      fetchTasks();
      return;
    }

    setLoading(true);
    try {
      const data = await taskApi.findTasksByName(value);
      setTasks(data);
    } catch (error) {
      message.error('No tasks found with that name');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      message.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const handleExecute = async (task: Task) => {
    try {
      setLoading(true);
      const updatedTask = await taskApi.executeTask(task.id);
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
      message.success('Task executed successfully');
      setSelectedTask(updatedTask);
      setExecutionModalVisible(true);
    } catch (error) {
      message.error('Failed to execute task');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setIsFormVisible(false);
    setEditingTask(null);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleViewExecutions = (task: Task) => {
    setSelectedTask(task);
    setExecutionModalVisible(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Task, b: Task) => a.name.localeCompare(b.name),
      render: (text: string, record: Task) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            ID: {record.id}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      sorter: (a: Task, b: Task) => a.owner.localeCompare(b.owner),
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text code style={{ fontSize: '12px' }}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Executions',
      dataIndex: 'taskExecutions',
      key: 'executions',
      width: 100,
      render: (executions: any[]) => (
        <Badge count={executions.length} showZero color="green" />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_: any, record: Task) => (
        <Space size="small">
          <Tooltip title="Execute Task">
            <Button
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
              onClick={() => handleExecute(record)}
              loading={loading}
            />
          </Tooltip>
          <Tooltip title="View Executions">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewExecutions(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Task">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Task">
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: 'white' }}>
              Welcome, R Devika! 👋
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
              Task Management Dashboard
            </Text>
          </Col>
          <Col>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsFormVisible(true)}
                size="large"
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white'
                }}
              >
                Add Task
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchTasks}
                loading={loading}
                size="large"
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white'
                }}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      
      <CorsTest />
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Tasks
            </Title>
          </Col>
        </Row>

        <Row style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Search
              placeholder="Search tasks by name..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} tasks`,
          }}
          locale={{
            emptyText: (
              <Empty
                description="No tasks found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>

      <TaskForm
        visible={isFormVisible}
        onCancel={() => {
          setIsFormVisible(false);
          setEditingTask(null);
        }}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />

      <TaskExecutionModal
        visible={executionModalVisible}
        onCancel={() => setExecutionModalVisible(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;
