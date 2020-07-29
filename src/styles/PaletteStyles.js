export default {
	Palette: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr auto',
		minHeight: '111vh',
		background: '#ddd',
		flexFlow: 'wrap'
	},
	minHeight: {
		minHeight: '100vh'
	},
	Palette_colors: {
		display: 'flex',
		flexFlow: 'wrap'
	},
	goBack: {
		display: 'grid',
		placeItems: 'center',
		background: '#333',
		'& p': {
			background: '#eee',
			padding: '0.3em 0.45em',
			cursor: 'pointer',
			borderRadius: '3px',
			opacity: 0.7
		}
	},
	footer: {
		display: 'grid',
		placeItems: 'center',
		fontWeight: 600,
		'& p': {
			margin: '8px 0'
		},
		'& .emoji': {
			fontSize: '1.2em',
			textShadow: '0px 2px 2px red'
		}
	}
};
