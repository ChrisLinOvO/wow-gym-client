import { employeeActionType } from "./employee-action-type";

export const employeeListStart = () => ({
  type: employeeActionType.EMPLOYEE_LIST_START,
});

export const employeeListSuccess = (list) => ({
  type: employeeActionType.EMPLOYEE_LIST_SUCCESS,
  payload: list,
});

export const employeeListFailure = (err) => ({
  type: employeeActionType.EMPLOYEE_LIST_FAILURE,
  payload: err,
});

export const employeeLogin = (employee) => ({
  type: employeeActionType.EMPLOYEE_LOG_IN,
  payload: employee,
});

export const employeeLogout = () => ({
  type: employeeActionType.EMPLOYEE_LOG_OUT,
});