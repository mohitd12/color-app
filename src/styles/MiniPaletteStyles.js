import sizes from '../sizes';

export default {
	root: {
		background: 'white',
		border: '1px solid green',
		borderRadius: '5px',
		padding: '0.5rem',
		position: 'relative',
		'&:hover': {
			cursor: 'pointer'
		},
		'&:hover svg': {
			cursor: 'pointer',
			opacity: 1
		}
	},
	colors: {
		background: 'grey',
		height: '150px',
		width: '100%',
		borderRadius: '3px',
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'hidden',
		[sizes.down('sm')]: {
			height: '130px'
		},
		[sizes.down('xs')]: {
			height: '160px'
		}
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 0,
		paddingTop: '0.5rem',
		fontSize: '1rem',
		position: 'relative',
		[sizes.down('sm')]: {
			fontSize: '0.83rem'
		}
	},
	emoji: {
		fontSize: '1.5rem',
		[sizes.down('sm')]: {
			fontSize: '1.1rem'
		}
	},
	miniBox: {
		flex: '1 1 50px'
	},
	delete: {
		position: 'absolute',
		top: 0,
		right: 0
	},
	deleteIcon: {
		color: '#eee',
		opacity: 0,
		background: 'red',
		padding: '0.3em',
		transition: 'opacity 0.2s linear'
	}
};
