import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import { Typography, Link, Box, IconButton, Stack } from '@mui/material';

export const Scene4 = () => (
	<Stack textAlign="center" color="#fff" spacing={4}>
		<Typography
			fontFamily="Bricolage Grotesque Variable"
			fontSize="2rem"
			fontWeight={600}
			mb={2}
			px={2}
		>
			Want to know more about me?
		</Typography>
		<Stack direction="row" spacing={3} justifyContent="center">
			<Link
				href="mailto:hello@yunuchoi.me"
				underline="none"
				color="inherit"
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '56px',
					height: '56px',
					borderRadius: '50%',
					boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
					backdropFilter: 'blur(2px)',
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					transition: 'all 0.3s ease',
					'&:hover': {
						boxShadow: '0 0 16px rgba(250, 218, 122, 1)',
						transform: 'translateY(-2px)',
						'& svg': {
							color: '#FADA7A',
						},
					},
				}}
			>
				<Email
					sx={{
						fontSize: 24,
						color: 'white',
						'&:hover': {
							color: '#FADA7A',
						},
					}}
				/>
			</Link>

			<IconButton
				component="a"
				href="https://www.linkedin.com/in/yunuchoi"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				sx={{
					width: '56px',
					height: '56px',
					borderRadius: '50%',
					boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
					backdropFilter: 'blur(2px)',
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					transition: 'all 0.3s ease',
					'&:hover': {
						boxShadow: '0 0 16px rgba(250, 218, 122, 1)',
						transform: 'translateY(-2px)',
						'& svg': {
							color: '#FADA7A',
						},
					},
				}}
			>
				<LinkedIn
					sx={{
						fontSize: 24,
						color: 'white',
						'&:hover': {
							color: '#FADA7A',
						},
					}}
				/>
			</IconButton>

			<IconButton
				component="a"
				href="https://www.github.com/yunuchoi"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
				sx={{
					width: '56px',
					height: '56px',
					borderRadius: '50%',
					boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
					backdropFilter: 'blur(2px)',
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					transition: 'all 0.3s ease',
					'&:hover': {
						boxShadow: '0 0 16px rgba(250, 218, 122, 1)',
						transform: 'translateY(-2px)',
						'& svg': {
							color: '#FADA7A',
						},
					},
				}}
			>
				<GitHub
					sx={{
						fontSize: 22,
						color: 'white',
						'&:hover': {
							color: '#FADA7A',
						},
					}}
				/>
			</IconButton>
		</Stack>
	</Stack>
);
