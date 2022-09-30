export default async function requestApiCurrency() {
  try {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(endpoint);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
