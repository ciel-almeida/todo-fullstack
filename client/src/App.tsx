import './App.css';
import { FC, ReactElement } from 'react';
import { customTheme } from './theme/customTheme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Dashboard } from './pages/dashboard/dashboard';

const App: FC = (): ReactElement => {
	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			<Dashboard />
		</ThemeProvider>
	);
};

export default App;
