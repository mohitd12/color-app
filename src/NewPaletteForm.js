import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import { DRAWER_WIDTH } from './constants';
import seedColors from './seedColors';

import SortableColorList from './SortableColorList';
import NavPaletteForm from './NavPaletteForm';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = DRAWER_WIDTH;
const styles = (theme) => ({
	root: {
		display: 'flex',
		'& main': {
			padding: 0,
			overflowY: 'scroll',
			height: '98vh'
		}
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		lineHeight: 0,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
});

NewPaletteForm.defaultProps = {
	maxPalettes: 20
};

function NewPaletteForm(props) {
	const { palettes, maxPalettes, classes } = props;
	const theme = useTheme();
	const [ open, setOpen ] = React.useState(true);
	const [ curColor, setCurColor ] = React.useState('#f69100');
	const [ colors, setColors ] = React.useState(seedColors[0].colors);
	const [ colorName, setColorName ] = React.useState('');
	const [ paletteName, setPaletteName ] = React.useState('');
	const isPaletteFull = colors.length >= maxPalettes;

	useEffect(() => {
		document.title = 'Create a Palette with Chrome Picker';
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});
		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			return colors.every(({ color }) => color !== curColor);
		});
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
		});
	});

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleChangeComplete = (color, event) => {
		setCurColor(color.hex);
	};

	const createColor = () => {
		const newColor = {
			name: colorName,
			color: curColor
		};
		setColors([ ...colors, newColor ]);
		setColorName('');
	};

	const handleFormChange = (e) => {
		setColorName(e.target.value);
	};

	const handlePaletteName = (e) => {
		setPaletteName(e.target.value);
	};

	const handleSavePalette = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = colors;
		props.save(newPalette);
		props.history.push('/');
	};

	const handleRemoveColor = (colorName) => {
		setColors(colors.filter((color) => color.name !== colorName));
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(arrayMove(colors, oldIndex, newIndex));
	};

	const clearPalette = () => {
		setColors([]);
	};

	const generateRandomColor = () => {
		const allColors = palettes.map((palette) => palette.colors).flat();
		let randomNum;
		let randomColor;
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			randomNum = Math.floor(Math.random() * allColors.length + 1);
			randomColor = allColors[randomNum];
			isDuplicateColor = colors.some((color) => color.name === randomColor.name);
		}
		setColors([ ...colors, randomColor ]);
	};

	return (
		<div className={classes.root}>
			<NavPaletteForm
				classes={classes}
				open={open}
				curColor={curColor}
				handleDrawerOpen={handleDrawerOpen}
				handlePaletteName={handlePaletteName}
				handleSavePalette={handleSavePalette}
				paletteName={paletteName}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<ColorPickerForm
					clearPalette={clearPalette}
					generateRandomColor={generateRandomColor}
					isPaletteFull={isPaletteFull}
					curColor={curColor}
					handleChangeComplete={handleChangeComplete}
					createColor={createColor}
					colorName={colorName}
					handleFormChange={handleFormChange}
				/>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<SortableColorList
					colors={colors}
					remove={handleRemoveColor}
					axis="xy"
					onSortEnd={onSortEnd}
					pressDelay={100}
				/>
			</main>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
