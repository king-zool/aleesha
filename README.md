# Aleesha Travel & Tours

A student travel website for journeys from Al-Istiqama University, Sumaila, and return trips to campus. Built with HTML, CSS, and vanilla JavaScript; no framework, package installation, or compilation is required.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000.

## Pages

- `index.html` — homepage, coach hero and traveller search
- `fleet.html` — vehicle comparison
- `campus.html` — campus travel information
- `return-to-campus.html` — return journey search
- `rides.html` — ride results, sorting and filters
- `vehicle-details.html` — selected vehicle and journey
- `seats.html` — vehicle-specific seat maps
- `passenger.html` — lead passenger details
- `confirm.html` — review and save a reservation request
- `success.html` — saved request reference
- `bookings.html` — locally saved requests and cancellation

Shared styling is in `styles.css`; interactions and sample data are in `app.js`. `logo.png` and `coach-hero.png` are included assets. Some vehicle photography and fonts load from external services and need internet access.

## Prototype behaviour

Routes, fares, departure times and available seats are examples. Selections use sessionStorage; reservation requests use localStorage on the current device. No payment processing, live seat inventory, operator confirmation, authentication or backend database is connected. A saved request is not a confirmed travel ticket.

Aleesha is an independent student project and does not imply university operation, partnership or endorsement. Static hosting can serve these files directly.
