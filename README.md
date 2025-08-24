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
  - Frontend architecture can be refined. For example:
    - Adopt [Atomic Design](https://atomicdesign.bradfrost.com/) for component structure
    - Stronger separation of concerns between UI, hooks, and data access
    - More consistent typing across components
    - Scalable folder and component organization
