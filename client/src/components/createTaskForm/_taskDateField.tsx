import { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import { IDateField } from './interfaces/IDateField';

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
	const { value = new Date(), disabled = false, onChange = date => console.log(date) } = props;

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
			{/* <DesktopDatePicker
				label="Controlled picker"
				value={value}
				onChange={newValue => setValue(newValue)}
			/> */}
			<DemoContainer components={['DatePicker']}>
				<DatePicker
					label="Task Date"
					// inputFormat='dd/MM/yyyy'
					value={value}
					onChange={onChange}
					disabled={disabled}
					sx={{ width: '100%' }}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
};

TaskDateField.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.instanceOf(Date),
};
