import CrudApi from "./CrudClass";
const CrudForAddNotification = new CrudApi(
  "http://localhost:8000/api/v1",
  "/Notifications"
);
const addnotification = async (body) => {
  const addschoolprocess = await CrudForAddNotification.createItem(
    body,
    () => {}
  );
  console.log(addschoolprocess);
};

export default addnotification;
