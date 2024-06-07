import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/Task';
import { createComment } from '@/apis/comments/create';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getOneTask } from '@/apis/tasks/getOne';
import { useTask } from '@/context/TaskContext';

const CommentSchema = z.object({
  content: z.string().min(1).max(500),
});

interface CommentsTabProps {
  task: Task;
}

const CommentsTab = ({ task }: CommentsTabProps) => {
  const [showtask, setShowTask] = useState<Task>(task);
  const [newComment, setNewComment] = useState('');

  const {refreshTasks} = useTask();

  useEffect(() => {
    setShowTask(task);
  }, [task]);

  const handleAddComment = async () => {
    try {
      const validationResult = CommentSchema.safeParse({ content: newComment });
      if (!validationResult.success) {
        toast.error('Empty comment');
        return;
      }

      await createComment(task._id, { content: newComment });
      const updatedTask = await getOneTask(task._id);
      setShowTask(updatedTask);

      refreshTasks();

      toast.success('Comment added successfully');
      setNewComment('');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  // console.log('task:', task)

  return (
    <div className="space-y-4">

      {showtask.comments.length > 0 ? (
        showtask.comments.map((comment, index) => (
          <div key={index} className="p-4 bg-background shadow rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-indigo-600">{comment.author.name}</span>
              <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-gray-800">{comment.content}</p>
          </div>
        ))
      ) : (
        <div className="p-4 bg-background shadow rounded-lg text-center text-foreground">No comments found.</div>
      )}
      <div className="flex justify-end">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          onClick={handleAddComment}
          className="py-2 px-4 bg-indigo-600 text-background rounded-lg hover:bg-indigo-400 transition duration-300 ease-in-out mt-2"
        >
          <p>Add Comment</p>
        </Button>
      </div>
    </div>
  );
};

export default CommentsTab;
