# Personal Web Portfolio - Full Stack

This is my personal portfolio website project, built with a modern full-stack architecture. The frontend is developed with **React** and **Vite**, designed with **Tailwind CSS**, while the backend is a lightweight **Node.js/Express.js** server responsible for handling API requests. The entire application is containerized with **Docker** for consistent deployment and scalability.

This project showcases my professional profile, skills, work experience, and certifications in the field of *System and Security Engineering*.

<img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/f2172d4f-d726-4230-a6e4-293e5665268d" />


## Key Features

* **Modern & Futuristic Design**: A sleek and futuristic design theme with a black and gold color palette.
* **Interactive Animations**: Utilizes `Framer Motion` for smooth and engaging *on-scroll* animations.
* **Functional Contact Form**: Features a backend API that processes contact form submissions and sends them directly to my email using the Resend service.
* **Component-Based Structure**: Code is neatly organized into reusable React components for maintainability.
* **Containerized Deployment**: Fully containerized with Docker and Docker Compose, ensuring a consistent environment from development to production.
* **Dynamic Icons**: Employs `lucide-react` for sharp and consistent SVG icons across the application.

## Tech Stack & Architecture

This project follows a decoupled, client-server architecture.

* **Frontend**:
    * Framework: **React**, **Vite.js**
    * Styling: **Tailwind CSS**, PostCSS
    * Animations: **Framer Motion**

* **Backend**:
    * Runtime: **Node.js**
    * Framework: **Express.js**
    * Email Service: **Resend API**

* **Deployment & Infrastructure**:
    * Containerization: **Docker**, **Docker Compose**
    * Web Server / Reverse Proxy: **Nginx**

## Running The Project

The recommended way to run this project is by using **Docker Compose**, as it will spin up the entire full-stack application (frontend and backend) in a production-like environment.

### 1. Running with Docker (Recommended)

This method will build and run both the frontend and backend containers.

1.  **Clone this repository:**
    ```bash
    git clone [https://github.com/silvaronna/portofolioReactJS.git](https://github.com/silvaronna/portofolioReactJS.git)
    cd portofolioReactJS
    ```

2.  **Configure Backend Environment:**
    Navigate to the `email-server` directory and create a `.env.local` file. This file will hold your secret API key for the email service.
    ```bash
    cd email-server
    cp .env.example .env.local 
    ```
    Now, edit `.env.local` and add your Resend API key.

3.  **Build and Run with Docker Compose:**
    Return to the root directory of the project and run the following command:
    ```bash
    # Make sure you are in the root 'portofolioReactJS' directory
    docker-compose up --build -d
    ```

4.  **Open the Application:**
    Open [http://localhost](http://localhost) (or `http://localhost:80`) in your browser. The full application is now running.

---

### 2. Frontend-Only Development (Legacy)

If you only wish to work on the frontend UI without backend functionality, you can run the Vite development server directly.

1.  **Navigate to the frontend directory:**
    ```bash
    # From the root directory
    cd Porto-Web
    ```

2.  **Install dependencies:**
    Use `npm` to install all the required packages.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command will start the Vite development server.
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.
    > **Note**: In this mode, the contact form will **not** function as it cannot connect to the backend server.
