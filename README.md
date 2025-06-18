# UDC Merchants App

This project consists of a frontend Angular application and a backend ASP.NET Core Web API with a SQL Server database, all containerized using Docker.

## Getting Started

To run the application locally, follow the steps below.

### Prerequisites

- Make sure [Docker](https://www.docker.com/) is installed.
- Ensure that Docker is configured to use **Linux containers** (not Windows containers).

### Running the Application

1. Clone the repository:
   ```powershell
   git clone https://github.com/leveebreaks/udc.merchants.git
   cd udc.merchants
2. Build and start the containers:
    ```powershell
    docker-compose up --build
3. Access the applications:
- Frontend (Angular app): http://localhost:4200
- Backend (Scalar Web API UI): http://localhost:5297/scalar

⚠️ The first run may take a few minutes as the containers are built and dependencies are installed.
⚠️ In case of connection issues with the database (e.g. login failures or EF Core migration errors), try stopping the containers and rebuilding:
    ```powershell
    docker-compose down
    docker-compose up --build