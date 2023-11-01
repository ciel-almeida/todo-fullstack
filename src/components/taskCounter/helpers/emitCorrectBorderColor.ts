import { Status } from '../../createTaskForm/enums/Status';
import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const emitCorrectBorderColor = (status: TaskCounterStatusType): string => {
	switch (status) {
		case Status.completed:
			return 'success.light';
		case Status.todo:
			return 'warning.light';
		case Status.inProgress:
			return 'error.light';
	}
};
