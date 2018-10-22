import { request } from "./api";

export function getWorkout(workoutId) {
  const config = {
    url: `/workout/${workoutId}`,
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return request(config).then(status => status);
}

export function beginWorkout(workout, name, parentWorkoutId) {
  const config = {
    url: `/loggedWorkout`,
    method: "POST",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: {
      workout,
      name,
      parentWorkoutId
    }
  };

  return request(config).then(status => status);
}

// This is used on the backend, can use on FE as well if we want
export function validateWorkoutSchema(workout) {
  // check top level value types
  if (!Array.isArray(workout)) {
    return {
      error: "Workout is not of type Array"
    };
  }

  // Loop through and check set and exercise schema
  for (let setIndex = 0; setIndex < workout.length; setIndex++) {
    // Check if set is an object
    if (workout[setIndex] === null || typeof workout[setIndex] !== "object") {
      return {
        error: "All sets must be of type Object"
      };
    }

    // check set schema
    // Check if exercises exists
    if (!workout[setIndex].exercises) {
      return {
        error: "Each set must contain an exercises array"
      };
    }

    // Check for set ID and type of number
    if (
      workout[setIndex].id === undefined ||
      typeof workout[setIndex].id !== "number"
    ) {
      return {
        error: "Each set must contain an ID that is of type number"
      };
    }

    // Check exercises type is an Array
    if (!Array.isArray(workout[setIndex].exercises)) {
      return {
        error: "Workout is not of type Array"
      };
    }

    // Loop through and check exercise schema
    for (
      let exerciseIndex = 0;
      exerciseIndex < workout[setIndex].exercises.length;
      exerciseIndex++
    ) {
      // Check for IDs and type of number
      if (
        workout[setIndex].exercises[exerciseIndex].id === undefined ||
        typeof workout[setIndex].exercises[exerciseIndex].id !== "number"
      ) {
        return {
          error: "Each excersize must contain an ID that is of type number"
        };
      }

      // Check for name
      if (!workout[setIndex].exercises[exerciseIndex].name) {
        return {
          error: "Each excersize must contain a name"
        };
      }
    }
  }

  return {
    error: false
  };
}
