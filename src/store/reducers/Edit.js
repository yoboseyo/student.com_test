let defaultState = [{
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NzI1fQ==",
  "name": "urbanest North Terrace",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false,
	"select": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTg5fQ==",
  "name": "urbanest Cleveland Street",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTk0fQ==",
  "name": "urbanest Quay Street",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6MTA4Nn0==",
  "name": "urbanest Glebe",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTkwfQ==",
  "name": "urbanest Darlington",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTg4fQ==",
  "name": "urbanest Carlton",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTk1fQ==",
  "name": "urbanest South Bank",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTk3fQ==",
  "name": "urbanest Sydney Central",
  "currency": "GBP",
  "symbol": "£",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVskk3iuf2aZCI6NzI1fQ==",
  "name": "E 10th & 1st Ave",
  "currency": "USD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcppqolKKJNKpZCI6NzI1fQ==",
  "name": "Elizabeth & Spring",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoioo1j28dkJSO88uIJHNKwNzI1fQ==",
  "name": "Ludlow & Hester",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcde3JJLqKIPpZCI6NzI1fQ==",
  "name": "Scape Abercrombie",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiL00oJJIONzI1fQ==",
  "name": "Iglu Chatswood",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydKOOEg22ZCI6NzI1fQ==",
  "name": "Western Sydney University Village - Hawkesbury",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHksk3ls1ssiLCJpZCI6NzI1fQ==",
  "name": "Western Sydney University Village - Bankstown",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvc00o19kiLCJpZCI6NzI1fQ==",
  "name": "Western Sydney University Village - Bankstown",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpmmaYUoI1fQ==",
  "name": "Sydney City",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGV0IIjqjndfZCI6NzI1fQ==",
  "name": "Jack’s Place",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcG551HkiLCJpZCI6NzI1fQ==",
  "name": "Forest Lodge",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}, {
  "id": "eyJ0eXBlIjoiUHJvcGVydHk9o2JpZCI6NzI1fQ==",
  "name": "Empire Hotel",
  "currency": "AUD",
  "symbol": "$",
	"room": [],
	"roomIndex": 0,
	"saved": false
}];

const Edit = (state = defaultState, action) => {
	let arrProperty = [...state];
	switch (action.type) {
		case "SELECT_PROPERTY":
			arrProperty.forEach((item, index) => {
				item.id === action.payload ? item.select = true : item.select = false;
			});
			return arrProperty;
		case "DESELECT_PROPERTY":
			arrProperty.forEach((item, index) => {
				if (item.select) {
					item.select = false;
				}
			});
			return arrProperty;
		case "ADD_ROOM":
			arrProperty.forEach((item, index) => {
				if (item.select) {
					action.payload.key = item.roomIndex;
					item.room.push(action.payload);
					item.roomIndex ++;
				}
			});
			return arrProperty;
		case "SAVE_EDITED_ROOM":
			arrProperty.forEach((item, index) => {
				if (item.select) {
					item.room.forEach((subItem, subIndex) => {
						if (subItem.key === action.payload.key) {
							item.room[subIndex] = action.payload;
						}
					});
				}
			});
			return arrProperty;
		case "DELETE_ROOM":
			arrProperty.forEach((item, index) => {
				if (item.select) {
					item.room.forEach((subItem, subIndex) => {
						if (subItem.key === action.payload) {
							item.room.splice(subIndex, 1);
						}
					});
				}
			});
			return arrProperty;
		case "CANCEL_ADDED_ROOM":
			arrProperty.forEach((item, index) => {
				if (!item.saved) {
					item.room = [];
				}
			});
			return arrProperty;
		case "SAVE_PROPERTY":
			arrProperty.forEach((item, index) => {
				if ((item.room.length > 0 && !item.saved) || item.select) {
					item.saved = true;
					item.select = false;
				}
			});
			return arrProperty;
		default:
			return state;
	}
}

export default Edit;
