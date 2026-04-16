import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme, colors } from "./theme";

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/schibsted-grotesk";
import { Home } from "./pages/Home";
import { Analytics } from "@vercel/analytics/react";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles
				styles={{
					":root": { "--space-bg": colors.spaceBg },
				}}
			/>
			<Analytics />
			<CssBaseline />
			<Home />
		</ThemeProvider>
	);
}

export default App;
