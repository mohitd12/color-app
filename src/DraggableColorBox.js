import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import sizes from './sizes';

const styles = {
	root: {
		width: '25%',
		height: '170px',
		display: 'inline-block',
		position: 'relative',
		textTransform: 'uppercase',
		transition: 'all 0.1s linear',
		cursor: 'pointer',
		'&:hover svg': {
			color: '#eee',
			transition: 'all 0.2s cubic-bezier(.455, .03, .515, .955)',
			transform: 'translateY(-3px) scale(1.2)'
		},
		[sizes.down('xs')]: {
			width: '50%'
		}
	},
	boxContent: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		width: '100%',
		padding: '0.2em 0.4em',
		fontWeight: 'bold',
		color: '#222',
		'& *': {
			margin: 0,
			padding: 0
		}
	}
}; 

const DraggableColorBox = SortableElement((props) => {
	const { classes, color, remove } = props;
	return (
		<div style={{ background: color.color }} className={classes.root}>
			<div className={classes.boxContent}>
				<p>{color.name}</p>
				<DeleteIcon className={classes.deleteIcon} onClick={() => remove(color.name)} />
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);
