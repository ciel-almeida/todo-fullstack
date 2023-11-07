import './App.css';
import { FC, ReactElement } from 'react';
import { customTheme } from './theme/customTheme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Dashboard } from './pages/dashboard/dashboard';
import ComposeContext from './context/Compose.context';
import { rootContext } from './context/root.context';

const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
	return (
		<QueryClientProvider client={queryClient}>
			<ComposeContext components={rootContext}>
				<ThemeProvider theme={customTheme}>
					<CssBaseline />
					<Dashboard />
				</ThemeProvider>
			</ComposeContext>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
