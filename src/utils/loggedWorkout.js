import { request } from './api';

export function getLoggedWorkout(workoutId) {
    const config = {
      url: `/loggedWorkout/${workoutId}`,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    return request(config)
      .then(status => status)
  }