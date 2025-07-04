import { Avatar, Link, Stack, Typography, Box } from '@mui/material';
import profileImage from '../assets/profile.jpeg';

export const Scene2 = () => {
	return (
		<Stack
			spacing={4}
			alignItems="center"
			textAlign="center"
			direction={{ xs: 'column', sm: 'row' }}
			sx={{
				px: { xs: 2, sm: 0 },
				justifyContent: 'center',
				height: '100%',
			}}
		>
			<Avatar
				src={profileImage}
				alt="Yunu Choi"
				sx={{
					width: { xs: 100, sm: 120 },
					height: { xs: 100, sm: 120 },
					borderRadius: 2,
				}}
			/>
			<Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
				<Typography
					fontFamily="Bricolage Grotesque Variable"
					fontSize={{ xs: '2rem', sm: '2.25rem' }}
					fontWeight={700}
					color="#fff"
					sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
				>
					I'm Yunu
					<Box
						component="span"
						sx={{
							display: 'inline-block',
							animation: 'wave 2s infinite',
							transformOrigin: '70% 70%',
							fontSize: '1.75rem',
							'@keyframes wave': {
								'0%': { transform: 'rotate(0deg)' },
								'10%': { transform: 'rotate(14deg)' },
								'20%': { transform: 'rotate(-8deg)' },
								'30%': { transform: 'rotate(14deg)' },
								'40%': { transform: 'rotate(-4deg)' },
								'50%': { transform: 'rotate(10deg)' },
								'60%': { transform: 'rotate(0deg)' },
								'100%': { transform: 'rotate(0deg)' },
							},
						}}
					>
						👋
					</Box>
				</Typography>
				<Typography
					fontSize={{ xs: '1rem', sm: '1.25rem' }}
					fontFamily="Schibsted Grotesk Variable"
					color="#fff"
				>
					Software Engineer @{' '}
					<Link
						href="https://elementx.ai"
						target="_blank"
						rel="noopener noreferrer"
						color="inherit"
						underline="hover"
						sx={{ fontWeight: 'bold' }}
					>
						ElementX
					</Link>
				</Typography>
			</Stack>
		</Stack>
	);
};
