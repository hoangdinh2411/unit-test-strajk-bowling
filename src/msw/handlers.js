import { http, HttpResponse } from 'msw';

const handlers = [
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    async ({ request }) => {
      const body = await request.json();
      const price = parseInt(body.lanes) * 100 + parseInt(body.people) * 120;
      const booking = {
        active: true,
        id: 'STR691TQAG',
        price,
        lanes: body.lanes,
        people: body.people,
        shoes: body.shoes,
        when: body.when,
      };

      return HttpResponse.json(booking);
    }
  ),
];

export default handlers;
