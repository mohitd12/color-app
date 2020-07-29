import React from 'react';
import { SortableContainer } from 'react-sortable-hoc'; 
import DraggableColorBox from './DraggableColorBox';

const SortableColorList = SortableContainer(({ colors, remove }) => {
	return (
		<div style={{ height: '100%' }} className="">
			{colors.map((color, idx) => (
				<DraggableColorBox index={idx} key={color.name} color={color} remove={remove} />
			))}
		</div>
	);
});

export default SortableColorList;
