import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { Typography, Link, Stack, Box } from "@mui/material";
import { colors } from "../theme";

const contacts = [
	{ label: "Email", icon: Email, href: "mailto:hello@yunuchoi.me" },
	{
		label: "LinkedIn",
		icon: LinkedIn,
		href: "https://www.linkedin.com/in/yunuchoi",
		target: "_blank",
	},
	{
		label: "GitHub",
		icon: GitHub,
		href: "https://www.github.com/yunuchoi",
		target: "_blank",
	},
];

export const Contact = () => (
	<Stack textAlign="center" spacing={2}>
		<Box>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize={{ xs: "1.75rem", sm: "2rem" }}
				fontWeight={700}
				color="text.primary"
			>
				Find me on
			</Typography>
		</Box>
		<Box display="flex" justifyContent="center" flexWrap="wrap" gap={4}>
			{contacts.map(({ label, icon: Icon, href, target }) => (
				<Link
					key={label}
					href={href}
					target={target}
					rel={target ? "noopener noreferrer" : undefined}
					aria-label={label}
					underline="none"
					sx={{
						color: "text.secondary",
						transition: "color 0.3s, filter 0.3s",
						"&:hover": {
							color: colors.gold,
							filter: `drop-shadow(0 0 6px ${colors.goldGlowSoft}) drop-shadow(0 0 12px ${colors.goldGlowMid})`,
						},
					}}
				>
					<Icon sx={{ fontSize: 36 }} />
				</Link>
			))}
		</Box>
	</Stack>
);
