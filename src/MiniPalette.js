import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const MiniPalette = React.memo((props) => {
	const { classes, paletteName, emoji, colors, clickToGo, id, openDialog } = props;
	const miniColorBoxes = colors.map((color) => (
		<div key={color.name} className={classes.miniBox} style={{ background: color.color }} />
	));

	const deleteMyPalette = (e) => {
		e.stopPropagation();
		openDialog(id);
	};

	useEffect(() => {
		document.title = 'React Colors';
	});

	return (
		<div className={classes.root} onClick={clickToGo}>
			<div className={classes.delete}>
				<DeleteIcon className={classes.deleteIcon} onClick={deleteMyPalette} />
			</div>
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName} <span className={classes.emoji}> {emoji} </span>
			</h5>
		</div>
	);
}, (nextProps, prevProps) => nextProps.colors === prevProps.colors);

export default withStyles(styles)(MiniPalette);
