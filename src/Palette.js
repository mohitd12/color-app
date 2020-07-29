import React from 'react';
import { withStyles } from '@material-ui/styles';

import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class Palette extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 500,
			format: 'hex'
		};
		this.handleChangeLevel = this.handleChangeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}

	componentDidMount() {
		document.title = this.props.palette.paletteName;
	}

	handleChangeLevel(level) {
		this.setState({
			level: level
		});
	}

	changeFormat(val) {
		this.setState({
			format: val
		});
	}

	render() {
		const { classes } = this.props;
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { level, format } = this.state;
		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				key={color.id}
				color={color[format]}
				name={color.name}
				moreUrl={`/palette/${id}/${color.id}`}
				showLink={true}
			/>
		));

		return (
			<div className={classes.Palette}>
				<Navbar level={level} changeLevel={this.handleChangeLevel} handleChange={this.changeFormat} />
				<div className={classes.Palette_colors}>{colorBoxes}</div>
				<footer className={classes.footer}>
					<p>
						{paletteName} <span className="emoji">{emoji} </span>
					</p>
				</footer>
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
