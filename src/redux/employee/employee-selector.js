import { createSelector } from "reselect";

const employeeSelect = (state) => state.employee;

export const currentEmployeeSelect = createSelector(
  [employeeSelect],
  (employee) => employee.currentEmployee
);

export const employeeListSelect = createSelector(
  [employeeSelect],
  (employee) => employee.employeeList
);