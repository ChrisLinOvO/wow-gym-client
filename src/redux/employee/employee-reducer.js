import { employeeActionType } from "./employee-action-type";

const INITIAL_STATE = {
  employeeList: [],
  currentEmployee: null,
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case employeeActionType.EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        employeeList: action.payload,
      };
    case employeeActionType.EMPLOYEE_LOG_IN:
      return {
        ...state,
        currentEmployee: action.payload,
      };
    case employeeActionType.EMPLOYEE_LOG_OUT:
      return {
        ...state,
        currentEmployee: null,
      };
    default:
      return state;
  }
};

export default employeeReducer;