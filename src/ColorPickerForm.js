import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		display: 'grid',
		placeItems: 'center',
		padding: '0.4em',
		'& h4': {
			margin: '0.5em 0',
			textDecoration: 'underline',
			fontSize: '2.2em'
		},
		'& .chrome-picker': {
			width: 'calc(100% - 1.34em) !important'
		}
	},
	buttons: {
		margin: '1em 0',
		'& button': {
			margin: '0 0.1em',
			fontSize: '0.9em'
		}
	},
	form: {
		padding: '0 0.7em',
		'& *': {
			width: '100%'
		},
		'& button': {
			margin: '0.8em 0',
			fontSize: '1.3em'
		}
	}
};

function ColorPickerForm(props) {
	const {
		clearPalette,
		generateRandomColor,
		isPaletteFull,
		curColor,
		handleChangeComplete,
		createColor,
		colorName,
		handleFormChange,
		classes
	} = props;
	return (
		<div className={classes.root}>
			<Typography variant="h4">Design your palette</Typography>
			<div className={classes.buttons}>
				<Button variant="contained" color="secondary" onClick={clearPalette}>
					Clear Palette
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={generateRandomColor}
					disabled={isPaletteFull && 'true'}
				>
					Random Color
				</Button>
			</div>
			<ChromePicker color={curColor} onChangeComplete={handleChangeComplete} />
			<br />
			<ValidatorForm className={classes.form} onSubmit={createColor} instantValidate={false}>
				<TextValidator
					value={colorName}
					onChange={handleFormChange}
					label="Color name"
					variant="filled"
					validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
					errorMessages={[ 'Cannot be empty.', 'Color name is taken!', 'Color used already!' ]}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					style={{ background: isPaletteFull ? 'grey' : curColor }}
					disabled={isPaletteFull && 'true'}
				>
					{isPaletteFull ? 'Palette Full' : 'Add color'}
				</Button>
			</ValidatorForm>
		</div>
	);
}

export default withStyles(styles)(ColorPickerForm);
