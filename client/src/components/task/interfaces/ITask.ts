import { ITaskDescription } from '../../taskArea/interfaces/ITaskDescription';
import { ITaskFooter } from '../../taskArea/interfaces/ITaskFooter';
import { ITaskHeader } from '../../taskArea/interfaces/ITaskHeader';

export interface ITask extends ITaskHeader, ITaskDescription, ITaskFooter {
	priority?: string;
}
