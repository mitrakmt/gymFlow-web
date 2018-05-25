import { request } from './api';

export function getWorkout(workoutId) {
    const config = {
      url: `/workout/${workoutId}`,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    return request(config)
      .then(status => status)
  }