import { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IProfile {
	name?: string;
}

export const Profile: FC<IProfile> = (props): ReactElement => {
	console.log(props);
	return (
		<Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
			<Avatar
				sx={{
					width: '96px',
					height: '96px',
					backgroundColor: 'primary.main',
					marginBottom: '16px',
				}}
			>
				<Typography variant="h4" color={'text.primary'}>
					{`${props.name?.substring(0, 1)}`}
				</Typography>
			</Avatar>
			<Typography variant="h6" color={'text.primary'}>
				Welcome, {props.name}
			</Typography>
			<Typography variant="body1" color={'text.primary'}>
				This is your personal tasks manager
			</Typography>
		</Box>
	);
};

Profile.propTypes = {
	name: PropTypes.string,
};
