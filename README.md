# Task Management App

This Task Management App is built using Svelte and Flowbite-Svelte, providing a responsive and user-friendly interface for managing tasks.

## Features

- Add, edit, and delete tasks
- Search tasks by title, description, or due date
- Responsive design for mobile and tablet views
- User authentication and token management

## Tech Stack

- **Frontend**: Svelte, Flowbite-Svelte, Tailwind CSS
- **Backend**: Directus with MySQL and endpoints for managing tasks and user authentication
- **State Management**: Svelte Stores

## Installation

### Prerequisites

- Node.js and npm installed
- MySQL installed and running
- Directus installed and configured

### Frontend setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/msskarthik/robotspace-assessment.git
    cd robotspace-assessment
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:

    ```bash
    npm run dev -- --open
    ```

4. **Open your browser** and navigate to [http://localhost:5173](http://localhost:5173).

### Backend Setup

1. **Install Directus**:

    Follow the official Directus [installation guide](https://docs.directus.io/getting-started/quickstart.html).

2. **Configure Directus**:

    - Set up your MySQL database.
    - Create a new Directus project and connect it to your MySQL database.
    - Added configuration file for the directus in directus-config folder.

    ```bash
        npm init directus-project@latest directus-api
    ```
    - Select MySQL as the database driver and provide the local MySQL credentials to connect.
    - Provide an email and password for setting up admin access to Directus.

3. **Start Directus**:

    ```bash
    npx directus start
    ```

4. **Open your browser** and navigate to [http://localhost:8055/admin/login](http://localhost:8055/admin/login).

5. **Create Collections**:

    ### Tasks Collection Schema

Open the above Directus admin portal and Create a collection named `tasks` with the following fields:

| Field Name  | Type       | Required | Description                                            |
|-------------|------------|----------|--------------------------------------------------------|
| id          | integer    | Yes      | Unique identifier for the task integer (auto-increment)|
| title       | string     | Yes      | Title of the task (input)                              |
| description | text       | Yes      | Description of the task (textarea)                     |
| status      | integer    | Yes      | Status of the task (1 = Active, 0 = Inactive)          |
| duedate     | dateTime   | Yes      | Due date of the task (Date)                            |

## Usage

### Adding a Task

- Click on the "Add Task" button.
- Fill in the task details including title, description, and due date.
- Click "Save" to add the task.

### Searching Tasks

- Use the search input to filter tasks by title, description, or due date.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request