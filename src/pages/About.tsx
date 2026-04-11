import { Avatar, Link, Stack, Typography, Box } from '@mui/material';
import profileImage from '../assets/profile.jpeg';
import { colors } from '../theme';

export const About = () => {
	return (
		<Stack
			spacing={{ xs: 3, sm: 6 }}
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
					outline: `1px solid ${colors.glassBorder}`,
				}}
			/>
			<Stack alignItems={{ xs: 'center', sm: 'flex-start' }} spacing={0.5}>
				<Typography
					fontFamily="Bricolage Grotesque Variable"
					fontSize={{ xs: '2rem', sm: '2.5rem' }}
					fontWeight={700}
					color="text.primary"
					lineHeight={1.1}
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
					fontSize={{ xs: '1rem', sm: '1.15rem' }}
					color="text.secondary"
				>
					Software Engineer @{' '}
					<Link
						href="https://elementx.ai"
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							fontWeight: 600,
							color: colors.gold,
							textDecoration: 'none',
							position: 'relative',
							'&::after': {
								content: '""',
								position: 'absolute',
								left: 0,
								bottom: '-1px',
								width: '100%',
								height: '1px',
								backgroundColor: colors.gold,
								transform: 'scaleX(0)',
								transformOrigin: 'left',
								transition: 'transform 0.3s ease',
								willChange: 'transform',
							},
							'&:hover::after': {
								transform: 'scaleX(1)',
							},
						}}
					>
						ElementX
					</Link>
				</Typography>
			</Stack>
		</Stack>
	);
};
