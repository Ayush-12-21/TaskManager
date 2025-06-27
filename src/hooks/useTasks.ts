
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface TaskInput {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
}

export const useTasks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log('Fetching tasks for user:', user.id);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      console.log('Fetched tasks:', data);
      return data as Task[];
    },
    enabled: !!user,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: TaskInput) => {
      if (!user) throw new Error('User not authenticated');

      console.log('Creating task:', taskData);
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          user_id: user.id,
          due_date: taskData.due_date || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating task:', error);
        throw error;
      }

      console.log('Created task:', data);
      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      toast.success('Task created successfully!');
    },
    onError: (error: any) => {
      console.error('Create task error:', error);
      toast.error('Failed to create task');
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, ...taskData }: TaskInput & { id: string }) => {
      console.log('Updating task:', id, taskData);
      const { data, error } = await supabase
        .from('tasks')
        .update({
          ...taskData,
          due_date: taskData.due_date || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating task:', error);
        throw error;
      }

      console.log('Updated task:', data);
      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      toast.success('Task updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update task error:', error);
      toast.error('Failed to update task');
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      console.log('Deleting task:', taskId);
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        console.error('Error deleting task:', error);
        throw error;
      }

      console.log('Deleted task:', taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      toast.success('Task deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Delete task error:', error);
      toast.error('Failed to delete task');
    },
  });

  // Toggle task completion
  const toggleTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const newStatus = task.status === 'completed' ? 'todo' : 'completed';
      console.log('Toggling task status:', task.id, 'from', task.status, 'to', newStatus);
      
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', task.id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling task:', error);
        throw error;
      }

      console.log('Toggled task:', data);
      return data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    },
    onError: (error: any) => {
      console.error('Toggle task error:', error);
      toast.error('Failed to update task status');
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
