import { Typography, Box, Chip } from '@mui/material';

const techStack = ['AI', 'TypeScript', 'React', 'Express', 'Python'];

export const Scene3 = () => {
	return (
		<Box textAlign="center" color="#fff" px={2}>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize="2rem"
				fontWeight={600}
				mb={2}
			>
				I make{' '}
				<Typography
					component="span"
					sx={{
						fontFamily: 'inherit',
						fontSize: 'inherit',
						color: '#FADA7A',
						display: 'inline-block',
						animation: 'magic-glow 5s infinite alternate',
						'@keyframes magic-glow': {
							'0%, 100%': {
								textShadow:
									'0 0 5px rgba(250, 218, 122, 0.3), 0 0 10px rgba(250, 218, 122, 0.6)',
							},
							'50%': {
								textShadow:
									'0 0 10px rgba(250, 218, 122, 0.8), 0 0 20px rgba(250, 218, 122, 1)',
							},
						},
					}}
				>
					magical
				</Typography>{' '}
				things happen with
			</Typography>
			<Box
				display="flex"
				justifyContent="center"
				flexWrap="wrap"
				gap={1}
				sx={{ px: 5 }}
			>
				{techStack.map((tech) => (
					<Chip
						key={tech}
						label={tech}
						color="primary"
						variant="outlined"
						sx={{
							fontFamily: 'Schibsted Grotesk Variable',
							fontSize: '1rem',
							borderColor: 'white',
							color: 'white',
							backdropFilter: 'blur(2px)',
							transition: 'all 0.3s ease',
							boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
							backgroundColor: 'rgba(255, 255, 255, 0.05)',
							'&:hover': {
								boxShadow: '0 0 16px rgba(250, 218, 122, 1)',
								transform: 'translateY(-1px)',
								color: '#FADA7A',
								borderColor: '#FADA7A',
							},
						}}
					/>
				))}
			</Box>
		</Box>
	);
};
