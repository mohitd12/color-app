import sizes from '../sizes';
export default {
	Navbar: {
		background: '#fff',
		display: 'flex',
		alignItems: 'center',
		[sizes.down('xs')]: {
			flexDirection: 'column',
			alignItems: 'center'
		}
	},
	logo: {
		background: '#394bad',
		color: '#eee',
		height: '67px',
		width: '20%',
		display: 'grid',
		placeItems: 'center',
		'& h2': {
			margin: 0,
			padding: 0,
			fontSize: '1.5rem',
			textShadow: '1px 1px 3px #555',
			[sizes.down('lg')]: {
				fontSize: '1.3rem'
			},
			[sizes.down('md')]: {
				fontSize: '1rem'
			},
			[sizes.down('sm')]: {
				fontSize: '0.8rem'
			},
			[sizes.down('xs')]: {
				width: '100%',
				fontSize: '1.4rem',
				textAlign: 'center'
			}
		},
		'& a': {
			textDecoration: 'none',
			color: 'inherit'
		},
		[sizes.down('xs')]: {
			width: '100%'
		}
	},
	sliderContainer: {
		display: 'flex',
		alignItems: 'center',
		width: '450px',
		height: '100%',
		[sizes.down('xs')]: {
			display: 'none'
		}
	},
	sliderValue: {
		padding: '0 0.8em',
		'& span': {
			fontWeight: 'bolder'
		}
	},
	slider: {
		width: '70%',
		margin: '0 10px',
		display: 'inline-block',
		'& .rc-slider-track': {
			background: 'transparent',
			height: '8px'
		},
		'& .rc-slider-rail': {
			height: '8px',
			background: '#30be9b'
		},
		'& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:focus': {
			background: 'green',
			outline: 'none',
			boxShadow: 'none',
			border: '2px solid green',
			marginTop: '-3.3px'
		}
	},
	selectContainer: {
		marginLeft: 'auto',
		marginRight: '21px',
		[sizes.down('xs')]: {
			margin: '5px 0'
		}
	}
};
