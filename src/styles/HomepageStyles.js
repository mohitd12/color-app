import sizes from '../sizes';
import svgBg from './confetti-doodles.svg';

export default {
	'@global': {
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 300ms ease-out'
		}
	},
	root: {
		background: `url(${svgBg})`,
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center'
	},
	container: {
		textAlign: 'center'
	},
	nav: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#eee',
		padding: '0 1em',
		'& a': {
			color: 'inherit',
			padding: '0.3em',
			[sizes.down('xs')]: {
				padding: '0.5em'
			}
		}
	},
	palettes: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 250px)',
		gridGap: '0.2em',
		boxSizing: 'border-box',
		padding: '0 1em',
		[sizes.down('sm')]: {
			gridTemplateColumns: 'repeat(3, 180px)'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)'
		}
	}
};
