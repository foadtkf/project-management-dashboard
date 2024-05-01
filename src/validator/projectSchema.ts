import vine from "@vinejs/vine";

export const projectCreateSchema = vine.object({
  name: vine.string().minLength(3).maxLength(15).trim(),
  description: vine.string().optional(),
  teamMembers: vine.array(vine.any()),
  recentActivities: vine.array(vine.string()),
  tasks: vine.array(
    vine.object({
      title: vine.string().minLength(3).maxLength(15).trim(),
      description: vine.string().optional(),
      deadline: vine.date(),
      assignedTo: vine.any(),
      status: vine.enum(["To Do", "In Progress", "Done"]),
    })
  ),
});
