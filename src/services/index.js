import axios from "../axios";
const getAllEventService = (data) => {
  return axios.get(`/api/get-all-event?date=${data.date}`);
};
const getAllEventService1 = (id) => {
  return axios.get(`/api/get-all-event1?id=${id}`);
};
const getCreateNewEventService = (data) => {
  return axios.post("/api/create-new-event", data);
};
const getEditEventService = (inputData) => {
  return axios.put("/api/get-edit-event", inputData);
};
const getDeleteEventService = (eventId) => {
  return axios.delete("/api/get-delete-event", {
    data: {
      id: eventId,
    },
  });
};
export {
  getAllEventService,
  getAllEventService1,
  getDeleteEventService,
  getCreateNewEventService,
  getEditEventService,
};
