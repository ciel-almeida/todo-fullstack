import { Status } from '../../createTaskForm/enums/Status';
import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const emitCorrectLabel = (status: TaskCounterStatusType): string => {
	switch (status) {
		case Status.completed:
			return 'Completed';
		case Status.inProgress:
			return 'In Progress';
		case Status.todo:
			return `Todo's`;
	}
};
