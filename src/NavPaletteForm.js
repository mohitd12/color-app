import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogPaletteForm from './DialogPaletteForm';
import { DRAWER_WIDTH } from './constants';
import sizes from './sizes';

const drawerWidth = DRAWER_WIDTH;
const styles = (theme) => ({
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	buttons: {
		position: 'absolute',
		right: 0,
		display: 'flex',
		padding: '0.8rem',
		'& button': {
			margin: '0 0.2em'
		},
		[sizes.down('xs')]: {
			flexDirection: 'column',
			marginRight: '8px',
			top: '52px',
			'& button': {
				margin: '0.2em 0',
				width: '0'
			}
		}
	}
});

function NavPaletteForm(props) {
	const { classes, open, curColor, handleDrawerOpen, handlePaletteName, handleSavePalette, paletteName } = props;
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
				style={{ backgroundColor: curColor }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.buttons}>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Button variant="contained" color="default">
							Home
						</Button>
					</Link>
					<DialogPaletteForm
						handlePaletteName={handlePaletteName}
						handleSavePalette={handleSavePalette}
						paletteName={paletteName}
					/>
				</div>
			</AppBar>
		</React.Fragment>
	);
}

export default withStyles(styles, { withTheme: true })(NavPaletteForm);
