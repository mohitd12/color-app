import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

import './ColorBox.css';

const styles = {
	copyText: {
		color: (props) => (chroma(props.color).luminance() >= 0.8 ? '#000' : '#fff'),
		textShadow: (props) => chroma(props.color).luminance() >= 0.8 && 'none'
	},
	colorName: {
		color: (props) => (chroma(props.color).luminance() <= 0.08 ? '#fff' : '#000')
	}
};

class ColorBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};
		this.handleCopy = this.handleCopy.bind(this);
	}

	handleCopy() {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	}

	render() {
		const { name, color, moreUrl, showLink, classes } = this.props;

		return (
			<CopyToClipboard text={color} onCopy={this.handleCopy}>
				<div style={{ background: color }} className="ColorBox">
					<div style={{ background: color }} className={`copy-overlay ${this.state.copied && 'show'}`} />
					<div className={`copy-msg ${this.state.copied && 'show'}`}>
						<h1>copied!</h1>
						<p className={classes.copyText}>{color} </p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className="copy-button">Copy</button>
						{showLink && (
							<Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
								<span className="see-more">More</span>
							</Link>
						)}
					</div>
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
