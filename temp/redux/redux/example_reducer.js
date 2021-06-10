// ACTION TYPES
const EXAMPLE_ACTION_CREATOR = 'EXAMPLE_ACTION_CREATOR';

// ACTION CREATORS AND THUNKS
// EXAMPLE ACTION CREATOR
export const setStudents = students => {
  return {
    type: SET_STUDENTS,
    students
  };
};

// EXAMPLE THUNK
export const addStudent = student => {
  return async dispatch => {
    const { data: created } = await axios.post('/api/students', student);
    dispatch(_addStudent(created));
  };
};

const initialState = {
  example: example
};

export default function dummyReducer (state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_ACTION_CREATOR:
      return state;
  }
  return state;
}
