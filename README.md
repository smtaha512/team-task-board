# Team Task Board

## Prerequistes

- Install the node version mentioned in `.nvmrc`.
- Install Docker and Docker compose.
- Run `docker compose -f compose.yml up`.

## How to run the project

- Open [http://localhost:4173](http://localhost:4173) to view the front-end.
- Open [http://localhost:3000](http://localhost:3000) to view the API documentation.

## How to run test cases

- Run `cp .env.sample .env.test` to copy environment variables for test execution.
- Run `npm run test:watch` to run test cases.

## Additional notes for reviewers

- This project creates, updates, delete and list the tasks as well as allow moving tasks between the columns.

- The `Dockerfile` and `docker-compose.yml` are not optimized for production.
- Several trade-offs were made due to time constraints. For example:

  - On task update and delete, all tasks are iterated. This works fine for the current small dataset, but could be refactored to mutate cached tasks in **O(1)**.
  - No Context API / Redux / other state management library is used, since it was out of scope for this project.
  - Task reordering within a column or moving between columns is not sorted. A possible approach would be to store `previousTaskId` and `nextTaskId` pointers:
    - First task has `null` for `previous`
    - Last task has `null` for `next`
    - All others point to another task in the same column
  - Search/filter functionality is not implemented due to time constraints.
  - The backend structure borrows from Domain-Driven Design and Vertical Slice Architecture, but does not fully implement these patterns.
  - There are [test cases](https://github.com/smtaha512/team-task-board/blob/main/backend/src/modules/task/adapters/controllers/task.controller.spec.ts) only for 1 route `POST /tasks`. More tests cases can be added in a similar fashion.
  - There are no test cases for use-cases/domain entities due to time limitation.
  - Frontend architecture can be refined. For example:
    - Adopt [Atomic Design](https://atomicdesign.bradfrost.com/) for component structure
    - Stronger separation of concerns between UI, hooks, and data access
    - More consistent typing across components
    - Scalable folder and component organization

- The backend is structured in the following way:
  - `infra`, `modules` and `shared` folders at the top.
    - `infra` contains all the code/modules that are necessary to start the application. For example configuration, connection to the database etc.
    - `modules` contains all the feature modules. For example `column` and `task` modules. Each module is further divided into multiple folder.
      - The core of each module is `domain` which represents the business domain. It does not depends upon any other part of the application. However other parts are dependant on it.
      - The `use-cases` folder contains all the business use-cases. For example updating a task is a business use-case and it performs multiple steps in its execution.
      - The `use-case` does not know about the `infra` folder. They only know about the `domain`. In this way it is easier to change anything in `infra` without changing the business logic.
      - The `infra` folder inside each domain contains the part that connects to the outer world. For example there are `adapters` for `controllers` which are the web facing entry points to the application and `persistence` which is dependent upon the database technology (PostgreSQL in this case) and ORM (TypeORM in this case) used.
