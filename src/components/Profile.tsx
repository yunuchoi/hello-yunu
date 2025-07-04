import { Avatar, IconButton, Link, Stack, Typography } from '@mui/material';
import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import profileImage from '../assets/profile.jpeg';

export const Profile = () => {
	return (
		<Stack spacing={3} alignItems="center" textAlign="center">
			<Avatar
				src={profileImage}
				alt="Yunu Choi"
				sx={{ width: 120, height: 120, borderRadius: 2 }}
			/>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize="2.25rem"
				fontWeight={700}
			>
				Yunu Choi
			</Typography>
			<Typography
				fontFamily="Schibsted Grotesk Variable"
				color="grey.300"
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
			<Typography
				fontFamily="Inter Variable"
				color="grey.400"
				maxWidth={480}
			>
				Enthusiastic software engineer driven by genuine curiosity and a
				passion for building solutions that make a real-world difference
				🚀
			</Typography>
			<Stack
				direction="row"
				spacing={1}
				alignItems="center"
				justifyContent="center"
			>
				<Link
					href="mailto:hello@yunuchoi.me"
					underline="hover"
					color="inherit"
					sx={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '1.1rem',
					}}
				>
					<Email sx={{ mr: 1, fontSize: 24, color: 'inherit' }} />
				</Link>
				<IconButton
					component="a"
					href="https://www.linkedin.com/in/yunuchoi"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					sx={{ color: '#ffffff' }}
				>
					<LinkedIn sx={{ fontSize: 24 }} />
				</IconButton>
				<IconButton
					component="a"
					href="https://www.github.com/yunuchoi"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					sx={{ color: '#ffffff' }}
				>
					<GitHub sx={{ fontSize: 22 }} />
				</IconButton>
			</Stack>
		</Stack>
	);
};
