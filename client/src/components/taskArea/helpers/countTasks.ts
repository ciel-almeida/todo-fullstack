import { Status } from '../../createTaskForm/enums/Status';
import { ITaskApi } from '../interfaces/ITaskApi';

export const countTasks = (tasks: ITaskApi[], status: Status): number => {
	if (!Array.isArray(tasks)) {
		return 0;
	}

	const totalTasks = tasks.filter(task => {
		return task.status === status;
	});

	return totalTasks.length;
};
