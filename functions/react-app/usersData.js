import fetch from 'isomorphic-fetch'

export default function fetchUserData() {
  return fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json())
}
