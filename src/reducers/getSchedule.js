import { RECEIVED_SCHEDULE_CAR, RECEIVED_SCHEDULE_MOT, RECEIVED_SCHEDULE_BY_EVENTID } from '../constants/processor'

//reducer for Jadwal Mobil
export const schedulecar = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_SCHEDULE_CAR:
			return action.payload
		default:
			return state
	}
}

//reducer for Jadwal detail by Id
export const schedulebyid = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_SCHEDULE_BY_EVENTID:
			return action.payload
		default:
			return state
	}
}

//reducer for Jadwal Motor
export const schedulemot = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_SCHEDULE_MOT:
			return action.payload
		default:
			return state
	}
}