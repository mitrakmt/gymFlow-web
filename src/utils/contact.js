import { request } from './api';

export function sendContact({ name, email, message }) {
    const config = {
      url: "/email/contact",
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
          name,
          email,
          message,
          topic: "Contact"
      }
    };
  
    return request(config)
      .then(status => status)
  }