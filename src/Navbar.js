import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'hex',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	handleChange(e) {
		this.setState({
			format: e.target.value,
			open: true
		});
		this.props.handleChange(e.target.value);
	}

	closeSnackbar() {
		this.setState({
			open: false
		});
	}

	render() {
		const { level, changeLevel, showLevel, classes } = this.props;
		const { format } = this.state;
		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<h2>
						<Link to="/">React Color Picker</Link>
					</h2>
				</div>
				{!showLevel && (
					<div className={classes.sliderContainer}>
						<div className={classes.sliderValue}>
							<p>
								Level: <span>{level} </span>
							</p>
						</div>
						<div className={classes.slider}>
							<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
						</div>
					</div>
				)}
				<div className={classes.selectContainer}>
					<Select labelId="simple-select" value={format} id="simple-select" onChange={this.handleChange}>
						<MenuItem value="hex">HEX</MenuItem>
						<MenuItem value="#hex">(#)HEX</MenuItem>
						<MenuItem value="rgb">RGB</MenuItem>
						<MenuItem value="rgba">RGBA</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={this.state.open}
					autoHideDuration={3000}
					message={<span id="messag-id">Format Changed!</span>}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
							<CloseIcon />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
