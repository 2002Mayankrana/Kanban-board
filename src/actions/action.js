import axios from "axios";

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: "dataRequest" });

    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );

    dispatch({ type: "dataSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "dataFailure" });
  }
};

export const dataSelect = (group, tickets, order) => async (dispatch) => {
  try {
    console.log(group, tickets, order);
    dispatch({ type: "dataSelectRequest" });

    let user = false;
    let set = new Set();
    let array = [],
      dataSelected = [];

    if (order === "title") {
      dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    if (group === "status") {
      tickets.forEach((element) => {
        set.add(element.status);
      });

      array = [...set];

      array.forEach((element, index) => {
        let array = tickets.filter((filterElement) => {
          return element === filterElement.status;
        });
        dataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    } else if (group === "user") {
      user = true;
      tickets?.users?.forEach((element, index) => {
        array = tickets?.tickets?.filter((filterElement) => {
          return element.id === filterElement.userId;
        });

        dataSelected.push({
          [index]: {
            title: element.name,
            value: array,
          },
        });
      });
      console.log(dataSelected);
    } else {
      let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((element, index) => {
        array = tickets.filter((filterElement) => {
          return index === filterElement.priority;
        });

        dataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    }

    if (order === "priority") {
      dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    console.log(dataSelected);
    dispatch({ type: "dataSelectSuccess", payload: { dataSelected, user } });
  } catch (error) {
    dispatch({ type: "dataSelectFailure", payload: error.message });
  }
};
