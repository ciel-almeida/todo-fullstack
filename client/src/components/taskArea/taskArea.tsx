import { FC, ReactElement, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
	const tasksUpdatedContext = useContext(TaskStatusChangedContext);

	const { error, isLoading, data, refetch } = useQuery('tasks', async () => {
		return await sendApiRequest<ITaskApi[]>('http://localhost:3200/tasks', 'GET');
	});

	const updateTaskMutation = useMutation((data: IUpdateTask) => {
		return sendApiRequest('http://localhost:3200/tasks', 'PUT', data);
	});

	function onStatusChangeHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
		updateTaskMutation.mutate({ id, status: e.target.checked ? Status.inProgress : Status.todo });
	}

	function markCompleteHandler(
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,
		id: string
	) {
		updateTaskMutation.mutate({ id, status: Status.completed });
	}

	useEffect(() => {
		refetch();
	}, [tasksUpdatedContext.updated]);

	useEffect(() => {
		if (updateTaskMutation.isSuccess) {
			tasksUpdatedContext.toggle();
		}
	}, [updateTaskMutation.isSuccess]);

	return (
		<Grid item md={8} px={4}>
			<Box mb={8} px={4}>
				<h2>Status Of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
			</Box>
			<Grid container display={'flex'} justifyContent={'center'}>
				<Grid
					item
					display="flex"
					flexDirection={'row'}
					justifyContent={'space-around'}
					alignItems={'center'}
					xs={12}
					md={10}
					mb={8}
				>
					<TaskCounter
						status={Status.todo}
						count={data ? countTasks(data, Status.todo) : undefined}
					/>
					<TaskCounter
						status={Status.inProgress}
						count={data ? countTasks(data, Status.inProgress) : undefined}
					/>
					<TaskCounter
						status={Status.completed}
						count={data ? countTasks(data, Status.completed) : undefined}
					/>
				</Grid>
				<Grid item display={'flex'} flexDirection={'column'} xs={10} md={8}>
					{/* Error message */}
					{error === true && <Alert severity="error">There was an error fetching your tasks</Alert>}

					{/* No data warning */}
					{!error && Array.isArray(data) && data.length === 0 && (
						<Alert severity="warning">
							You don't have any tasks created yet. Start by creating some tasks.
						</Alert>
					)}

					{/* Tasks */}
					{isLoading ? (
						<LinearProgress />
					) : (
						Array.isArray(data) &&
						data.length > 0 &&
						data.map((task, index) => {
							return task.status === Status.todo || task.status === Status.inProgress ? (
								<Task
									id={task.id}
									key={index + task.priority}
									title={task.title}
									date={new Date(task.date)}
									description={task.description}
									priority={task.priority}
									status={task.status}
									onStatusChange={onStatusChangeHandler}
									onClick={markCompleteHandler}
								/>
							) : (
								false
							);
						})
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};
