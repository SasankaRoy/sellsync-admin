import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios-interceptor";
import { toast } from "react-toastify";

// Hook to fetch task list
export const useTaskList = () => {
  return useQuery({
    queryKey: ["task_list"],
    queryFn: async () => {
      const response = await axiosInstance.post("/api/v1/user/task-list", {
        page: 1,
        limit: 100,
      });

      if (response.status === 200 && response.data) {
        return response.data.results || response.data.tasks || [];
      }
      throw new Error("Failed to fetch tasks");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};


// Hook to fetch single task by ID
export const useTaskById = (taskId) => {
  return useQuery({
    queryKey: ["task_detail", taskId],
    queryFn: async () => {
      const response = await axiosInstance.post("/api/v1/user/task-list", {
        page: 1,
        limit: 100,
      });

      if (response.status === 200 && response.data && response.data.results) {
        const foundTask = response.data.results.find(
          (t) => String(t.id || t._id).trim() === String(taskId).trim()
        );

        if (!foundTask) {
          throw new Error("Task not found");
        }

        return foundTask;
      }
      throw new Error("Failed to fetch task details");
    },
    enabled: !!taskId,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000,
  });
};

// Hook to update task status
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, task, newStatus }) => {
      const response = await axiosInstance.post(
        `api/v1/user/employee-task-update/${taskId}`,
        {
          employee_id: task.employee_id,
          task_title: task.title,
          task_details: task.task_details,
          task_deadline: task.task_deadline,
          task_status: newStatus,
        }
      );

      if (response.status === 200) {
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to update task status");
    },
    onSuccess: (data, variables) => {
      toast.success("Task status updated successfully");

      // Invalidate both task list and specific task queries
      queryClient.invalidateQueries({
        queryKey: ["task_list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task_detail", variables.taskId],
      });

      return data;
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update task status");
    },
  });
};
