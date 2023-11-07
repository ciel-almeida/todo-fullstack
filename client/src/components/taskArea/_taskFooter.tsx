import { FC, ReactElement } from 'react';
import { Box, Button, Switch, FormControlLabel } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
	const { onStatusChange = e => console.log(e), onClick = e => console.log(e), id, status } = props;
	return (
		<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={4}>
			<FormControlLabel
				label="In Progress"
				control={
					<Switch
						onChange={e => onStatusChange(e, id)}
						color="warning"
						defaultChecked={status === Status.inProgress}
					/>
				}
			/>
			<Button
				onClick={e => onClick(e, id)}
				variant="contained"
				color="success"
				size="small"
				sx={{
					color: '#ffffff',
				}}
			>
				Mark Complete
			</Button>
		</Box>
	);
};

TaskFooter.propTypes = {
	id: PropTypes.string.isRequired,
	status: PropTypes.string,
	onStatusChange: PropTypes.func,
	onClick: PropTypes.func,
};
