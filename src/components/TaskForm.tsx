import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Typography,
  App,
} from 'antd';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';
import { taskApi } from '../services/api';

const { TextArea } = Input;
const { Title } = Typography;

interface TaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  task?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  task,
}) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const isEditing = !!task;

  useEffect(() => {
    if (visible && task) {
      form.setFieldsValue({
        name: task.name,
        owner: task.owner,
        command: task.command,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, task, form]);

  const handleSubmit = async (values: CreateTaskRequest) => {
    setLoading(true);
    try {
      if (isEditing && task) {
        const updateData: UpdateTaskRequest = {
          ...values,
          id: task.id,
        };
        await taskApi.createOrUpdateTask(updateData);
        message.success('Task updated successfully');
      } else {
        await taskApi.createOrUpdateTask(values);
        message.success('Task created successfully');
      }
      onSubmit();
    } catch (error) {
      message.error(`Failed to ${isEditing ? 'update' : 'create'} task`);
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </Title>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Task Name"
          rules={[
            { required: true, message: 'Please enter task name' },
            { min: 3, message: 'Task name must be at least 3 characters' },
            { max: 100, message: 'Task name must be less than 100 characters' },
          ]}
        >
          <Input
            placeholder="Enter task name"
            size="large"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="owner"
          label="Owner"
          rules={[
            { required: true, message: 'Please enter owner name' },
            { min: 2, message: 'Owner name must be at least 2 characters' },
            { max: 50, message: 'Owner name must be less than 50 characters' },
          ]}
        >
          <Input
            placeholder="Enter owner name"
            size="large"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="command"
          label="Command"
          rules={[
            { required: true, message: 'Please enter command' },
            { min: 1, message: 'Command cannot be empty' },
            { max: 500, message: 'Command must be less than 500 characters' },
          ]}
        >
          <TextArea
            placeholder="Enter command to execute"
            rows={4}
            size="large"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button size="large" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
