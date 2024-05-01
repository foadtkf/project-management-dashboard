"use client";
import { IProject, TeamMember } from "@/types/types";
import { useProjects } from "@/zustand/store";
import { Form, Input, DatePicker, Select, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { useProjectsStore } from "@/zustand/store";

const { Option } = Select;

const EditForm = ({ projectID }: { projectID: string }) => {
  const { projects } = useProjects();
  const updateProject = useProjectsStore((state) => state.updateProject);
  const initialValues = projects.find((p) => p._id === projectID);
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    const fetchTeamMembers = async () => {
      try {
        setTeamMembers(initialValues?.teamMembers || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeamMembers();
  }, [form, initialValues]);

  const onFinish = (values: IProject) => {
    updateProject(values, projectID);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Project Name"
        name="name"
        rules={[{ required: true, message: "Please enter project name" }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Team Members"
        name="teamMembers"
        rules={[{ required: true, message: "Please select team members" }]}
      >
        <Select size="large" mode="multiple" placeholder="Select team members">
          {teamMembers.map((member) => (
            <Option key={member._id} value={member._id}>
              {member.email}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Divider orientation="left">Tasks</Divider>
      {initialValues?.tasks.map((task, index) => (
        <div key={index}>
          <Form.Item
            label={`Task ${index + 1}`}
            name={["tasks", index, "title"]}
            rules={[{ required: true, message: "Please enter task title" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label={`Description`}
            name={["tasks", index, "description"]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label={`Assigned To`}
            name={["tasks", index, "assignedTo"]}
            rules={[{ required: true, message: "Please select assignee" }]}
          >
            <Select size="large" placeholder="Select assignee">
              {teamMembers.map((member) => (
                <Option key={member._id} value={member._id}>
                  {member.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={`Status`}
            name={["tasks", index, "status"]}
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select size="large" placeholder="Select status">
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
        </div>
      ))}

      <Form.Item
        label="Recent Activities"
        name="recentActivities"
        rules={[{ required: true, message: "Please enter recent activities" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
