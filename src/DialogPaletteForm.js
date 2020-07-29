import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

function DialogPaletteForm(props) {
	const { handlePaletteName, handleSavePalette, paletteName } = props;
	const [ open, setOpen ] = React.useState('');

	const handleClickOpen = () => {
		setOpen('form');
	};

	const handleClose = () => {
		setOpen(false);
	};

	const showEmojiPicker = () => {
		setOpen('emoji');
	};

	const savePalette = (emoji) => {
		const newPalette = {
			paletteName: paletteName,
			emoji: emoji.native
		};
		handleSavePalette(newPalette);
		setOpen('');
	};

	return (
		<div>
			<Dialog open={open === 'emoji'} onClose={handleClose} aria-labelledby="emoji-dialog-title">
				<DialogTitle id="form-dialog-title">Pick one emoji</DialogTitle>
				<Picker title="Pick one emoji" emoji="point_up" onSelect={savePalette} />
			</Dialog>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Save
			</Button>
			<Dialog open={open === 'form'} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your beautiful palette. It needs to be unique!
					</DialogContentText>
					<ValidatorForm onSubmit={showEmojiPicker}>
						<TextValidator
							autoFocus
							margin="dense"
							id="name"
							fullWidth
							value={paletteName}
							label="Palette Name"
							onChange={handlePaletteName}
							validators={[ 'required', 'isPaletteNameUnique' ]}
							errorMessages={[ 'Cannot be empty.', 'Palette name is already taken!' ]}
						/>
						<DialogActions style={{ padding: '8px 0' }}>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" variant="contained" color="primary">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default DialogPaletteForm;
