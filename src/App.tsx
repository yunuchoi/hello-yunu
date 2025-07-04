import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';

import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/inter';
import '@fontsource-variable/schibsted-grotesk';
import { Scene } from './pages/Scene';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Scene />
		</ThemeProvider>
	);
}

export default App;
