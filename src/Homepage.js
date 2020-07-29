import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import MiniPalette from './MiniPalette';
import styles from './styles/HomepageStyles';

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			paletteId: ''
		};
		this.linkToPalette = this.linkToPalette.bind(this);
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	linkToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	handleOpenDialog(id) {
		this.setState({
			open: true,
			paletteId: id
		});
	}

	handleCloseDialog() {
		this.setState({
			open: false,
			paletteId: ''
		});
	}

	handleDelete() {
		this.props.deletePalette(this.state.paletteId);
		this.handleCloseDialog();
	}

	render() {
		const { palettes, classes } = this.props;
		const palettess = palettes.map((palette) => (
			<CSSTransition key={palette.id} classNames="fade" timeout={300}>
				<MiniPalette
					key={palette.id}
					{...palette}
					id={palette.id}
					clickToGo={() => this.linkToPalette(palette.id)}
					openDialog={this.handleOpenDialog}
				/>
			</CSSTransition>
		));

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">Create a Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>{palettess}</TransitionGroup>
				</div>
				<Dialog open={this.state.open} aria-labelledby="delete-dialog-title" onClose={this.handleCloseDialog}>
					<DialogTitle id="delete-dialog-title">Are you pretty sure?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ background: blue[100], color: blue[900] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button>
							<ListItemAvatar>
								<Avatar style={{ background: red[100], color: red[900] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" onClick={this.handleCloseDialog} />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(Homepage);
