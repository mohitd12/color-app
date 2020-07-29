import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class SingleColorPalette extends React.Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		this.state = {
			format: 'hex'
		};
		this.changeFormat = this.changeFormat.bind(this);
	}

	gatherShades(palette, colorId) {
		let shades = [];
		const allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorId));
		}
		return shades.slice(1);
	}

	changeFormat(val) {
		this.setState({
			format: val
		});
	}

	render() {
		const { classes, history } = this.props;
		const colorBoxes = this._shades.map((color) => (
			<ColorBox key={color.name} color={color[this.state.format]} name={color.name} />
		));
		return (
			<div className={`${classes.Palette} ${classes.minHeight}`}>
				<Navbar showLevel handleChange={this.changeFormat} />
				<div className={classes.Palette_colors}>
					{colorBoxes}
					<div className={`ColorBox ${classes.goBack}`}>
						<p onClick={() => history.goBack()}>← back</p>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
