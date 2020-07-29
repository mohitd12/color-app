import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import Homepage from './Homepage';
import NewPaletteForm from './NewPaletteForm';

class App extends React.Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
		this.state = {
			palettes: savedPalettes || seedColors
		};
		this.savePalette = this.savePalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find((palette) => {
			return palette.id === id;
		});
	}

	deletePalette(id) {
		this.setState(
			(st) => ({
				palettes: st.palettes.filter((palette) => palette.id !== id)
			}),
			this.syncLocalStorage
		);
	}

	savePalette(newPalette) {
		this.setState(
			{
				palettes: [ ...this.state.palettes, newPalette ]
			},
			this.syncLocalStorage
		);
	}

	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
	}

	render() {
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/palette/new"
						render={(routeProps) => (
							<NewPaletteForm {...routeProps} save={this.savePalette} palettes={this.state.palettes} />
						)}
					/>
					<Route
						exact
						path="/palette/:paletteId/:colorId"
						render={(routeProps) => (
							<SingleColorPalette
								palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
								colorId={routeProps.match.params.colorId}
								{...routeProps}
							/>
						)}
					/>
					<Route
						exact
						path="/palette/:id"
						render={(routeProps) => (
							<Palette
								{...routeProps}
								palette={generatePalette(this.findPalette(routeProps.match.params.id))}
							/>
						)}
					/>
					<Route
						exact
						path="/"
						render={(routeProps) => (
							<Homepage
								palettes={this.state.palettes}
								deletePalette={this.deletePalette}
								{...routeProps}
							/>
						)}
					/>
					<Route
						render={(routeProps) => (
							<Homepage
								palettes={this.state.palettes}
								deletePalette={this.deletePalette}
								{...routeProps}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
