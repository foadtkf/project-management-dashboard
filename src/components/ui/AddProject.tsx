"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { Button, Divider } from "antd";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import FormTextArea from "@/components/forms/FormTextArea";
import FormMultiSelectField from "../forms/FormMultiSelectField";
import { useGetUsers } from "@/actions/actions";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormSelectInput from "../forms/FormSelectInput";
import FormDatePicker from "../forms/FormDatePicker";
import { useProjectsStore } from "@/zustand/store";
import { IProject } from "@/types/types";

const AddProjectForm = () => {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [recentActivities, setRecentActivities] = useState<string[]>([""]);
  const addProject = useProjectsStore((state) => state.addProject);
  const { data, isLoading, isError } = useGetUsers();
  const userOptions = data?.map((user) => ({
    label: user.email,
    value: user._id,
  }));

  const handleAddTasks = (type: string) => {
    switch (type) {
      case "tasks":
        setTasks([...tasks, ""]);
        break;
      case "recentActivities":
        setRecentActivities([...recentActivities, ""]);
        break;
      default:
        break;
    }
  };
  const handleRemoveTasks = (index: number, type: string) => {
    switch (type) {
      case "tasks":
        setTasks(tasks.filter((_, i) => i !== index));
        break;
      case "recentActivities":
        setRecentActivities(recentActivities.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };
  const onSubmit: SubmitHandler<IProject> = async (data: any) => {
    addProject(data);
  };
  return (
    <div>
      <h1 className="text_24px pb-[15px]">Add A New Project</h1>
      <Form submitHandler={onSubmit}>
        <div>
          <FormInput name="name" label="Project Name" size="large" />
        </div>
        <div className="py-[15px]">
          <FormTextArea name="description" label="Description" rows={4} />
        </div>
        <div className="py-[15px]">
          <FormMultiSelectField
            label="Team Members"
            name="teamMembers"
            placeholder="Select Members"
            options={userOptions!}
          />
        </div>
        {tasks.map((t, index) => (
          <div className=" py-[15px]" key={`tasks-${index}`}>
            <div className="flex justify-between items-center">
              <Divider orientation="left">Task-{index + 1}</Divider>
              {index >= 1 && (
                <div>
                  <MinusCircleOutlined
                    className="dynamic-delete-button text-lg"
                    onClick={() => handleRemoveTasks(index, "tasks")}
                  />
                </div>
              )}
            </div>
            <div className="flex  w-full gap-2 pb-[10px]">
              <div className="flex-grow">
                <FormInput
                  name={`tasks[${index}].title`}
                  label={`Title`}
                  size="large"
                />
                <FormSelectInput
                  options={userOptions!}
                  name={`tasks[${index}].assignedTo`}
                  label="Assigned To"
                />
                <FormSelectInput
                  options={[
                    { label: "To Do", value: "To Do" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Done", value: "Done" },
                  ]}
                  name={`tasks[${index}].status`}
                  label="Status"
                />
                <FormDatePicker
                  name={`tasks[${index}].deadline`}
                  label={`Deadline`}
                  size="large"
                />
                <FormTextArea
                  name={`tasks[${index}].description`}
                  label={`Description`}
                  rows={4}
                />
              </div>
            </div>
            {index === tasks.length - 1 && (
              <Button onClick={() => handleAddTasks("tasks")}>Add More</Button>
            )}
          </div>
        ))}
        {recentActivities.map((r, index) => (
          <div className="pb-[15px]" key={`${index}`}>
            <div className="flex  w-full gap-2 pb-[10px]">
              <div className="flex-grow">
                <FormInput
                  name={`recentActivities[${index}]`}
                  label={`Recent Activity- ${index + 1}`}
                  size="large"
                />
              </div>
              {index >= 1 && (
                <div>
                  <MinusCircleOutlined
                    className="dynamic-delete-button text-lg"
                    onClick={() => handleRemoveTasks(index, "recentActivities")}
                  />
                </div>
              )}
            </div>
            {index === tasks.length - 1 && (
              <Button onClick={() => handleAddTasks("recentActivities")}>
                Add More
              </Button>
            )}
          </div>
        ))}
        <Button type="primary" htmlType="submit">
          Add Project
        </Button>
      </Form>
    </div>
  );
};

export default AddProjectForm;
