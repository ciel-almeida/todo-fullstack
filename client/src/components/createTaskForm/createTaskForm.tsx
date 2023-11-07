import { FC, ReactElement, useState, useEffect, useContext } from 'react';
import { Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import { TaskTitleField } from './_tastTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { useMutation } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import ICreateTaskResponse from '../taskArea/interfaces/ICreateTaskResponse';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [date, setDate] = useState<Date | null>(new Date());
	const [status, setStatus] = useState<string>(Status.todo);
	const [priority, setPriority] = useState<string>(Priority.normal);

	const [showSuccess, setShowSuccess] = useState<boolean>(false);

	const taskUpdatedContext = useContext(TaskStatusChangedContext);

	// Create task mutation
	const createTaskMutation = useMutation((data: ICreateTask) => {
		return sendApiRequest<ICreateTaskResponse>('http://localhost:3200/tasks', 'POST', data);
	});

	function createTaskHandler() {
		if (!title || !description || !date) return;
		const newTask: ICreateTask = {
			title,
			description,
			date: date.toString(),
			status,
			priority,
		};
		createTaskMutation.mutate(newTask);
	}

	useEffect(() => {
		if (createTaskMutation.isSuccess) {
			setShowSuccess(true);
			taskUpdatedContext.toggle();
		}

		const successTimeout = setTimeout(() => {
			setShowSuccess(false);
		}, 7000);

		return () => {
			clearTimeout(successTimeout);
		};
	}, [createTaskMutation.isSuccess]);

	return (
		<Box display="flex" flexDirection="column" alignItems="flex-start" width={'100%'} px={4} my={6}>
			<Typography mb={2} component={'h2'} variant="h6">
				Create A Task
			</Typography>

			<Stack spacing={2} sx={{ width: '100%' }}>
				<TaskTitleField
					onChange={e => setTitle(e.target.value)}
					disabled={createTaskMutation.isLoading}
				/>
				<TaskDescriptionField
					onChange={e => setDescription(e.target.value)}
					disabled={createTaskMutation.isLoading}
				/>
				<TaskDateField
					onChange={date => setDate(date)}
					value={date}
					disabled={createTaskMutation.isLoading}
				/>
				<Stack sx={{ width: '100%' }} direction={'row'} spacing={2}>
					<TaskSelectField
						value={status}
						onChange={e => setStatus(e.target.value as string)}
						disabled={createTaskMutation.isLoading}
						label="Status"
						name="status"
						items={[
							{ value: Status.todo, label: Status.todo.toUpperCase() },
							{ value: Status.inProgress, label: Status.inProgress.toUpperCase() },
						]}
					/>
					<TaskSelectField
						value={priority}
						onChange={e => setPriority(e.target.value as string)}
						disabled={createTaskMutation.isLoading}
						label="Priority"
						name="priority"
						items={[
							{ value: Priority.high, label: Priority.high.toUpperCase() },
							{ value: Priority.low, label: Priority.low.toUpperCase() },
							{ value: Priority.normal, label: Priority.normal.toUpperCase() },
						]}
					/>
				</Stack>
				{createTaskMutation.isLoading && <LinearProgress />}
				{showSuccess && (
					<Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
						<AlertTitle>Success</AlertTitle>
						The task has been created successfully
					</Alert>
				)}
				<Button
					onClick={createTaskHandler}
					disabled={
						!title || !description || !date || !status || !priority || createTaskMutation.isLoading
					}
					variant="contained"
					size="large"
					fullWidth
				>
					Create A Task
				</Button>
			</Stack>
		</Box>
	);
};
