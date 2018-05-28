export const selectPropertyAction = (data) => ({
	type: 'SELECT_PROPERTY',
	payload: data
});
export const deSelectPropertyAction = () => ({
	type: 'DESELECT_PROPERTY'
});
export const addRoomAction = (data) => ({
	type: 'ADD_ROOM',
	payload: data
});
export const saveEditedRoomAction = (data) => ({
	type: 'SAVE_EDITED_ROOM',
	payload: data
});
export const deleteRoomAction = (data) => ({
	type: 'DELETE_ROOM',
	payload: data
});
export const cancelAddedRoomAction = () => ({
	type: 'CANCEL_ADDED_ROOM'
});
export const savePropertyAction = () => ({
	type: 'SAVE_PROPERTY'
});
