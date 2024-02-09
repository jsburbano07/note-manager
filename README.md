# Notes Manager - README

## Access Credentials
```md
Usuario: jhoan@mail.com
Password: Secure123
```


## Frontend (React with Typescript)

### Technologies Used:

- **React:** [React Documentation](https://reactjs.org/docs/getting-started.html)
  - JavaScript library for building user interfaces.

- **Vite:** [Vite Documentation](https://vitejs.dev/guide/)
  - Fast frontend development build tool.

- **Date-fns:** [Date-fns Documentation](https://date-fns.org/docs/)
  - Library for handling dates in JavaScript.

- **Prim:** [Prim Documentation](https://github.com/prim-css/prim)
  - Lightweight CSS library.

- **React-Hook-Form:** [React Hook Form Documentation](https://react-hook-form.com/get-started)
  - Library for flexible and extensible forms.

- **Redux Toolkit:** [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/quick-start)
  - Tools to simplify Redux development.

- **Redux Persist:** [Redux Persist Documentation](https://github.com/rt2zz/redux-persist)
  - Persist and rehydrate a Redux store.

- **Sass:** [Sass Documentation](https://sass-lang.com/documentation)
  - Popular CSS extension language.

### Project Structure:

- **Styles:** Responsive design achieved through a template (`Template.tsx`) dividing the viewport. Actions (forms, search filters) on the left, data on the right.

- **State Management:** Redux Toolkit with Redux Persist for data persistence. Slices include:
  - `auth`: Manages user authentication with token and username.
  - `ui`: Controls loader state.
  - `notes`: Handles note-related data and filters.

- **Services:** Axios for API requests. Two services:
  - `NoteService`: CRUD for notes.
  - `AuthService`: CRUD for authentication/user.

- **Views:**
  - **Access:** Login and Register components rendered with separate routes ('/login' and '/register').
  - **Notes:** Renders `FiltersForm` managing filters and `ListNotes` for all notes based on filters.
  - **CreateNote:** Renders `NoteForm` for creating a note and `Note` for a live preview.
  - **EditNote:** Renders `NoteForm` for editing a note and `Note` for live preview.

- **Components:** `AccessForm`, `FiltersForm`, `FormNote`, `Leftbar`, `ListNotes`, `Note`, `Notify`, `Template`, `Loader`.

## Backend (NestJS)

### Technologies Used:

- **NestJS:** [NestJS Documentation](https://docs.nestjs.com/)
  - Progressive Node.js framework for efficient server-side applications.

- **MongoDB:** [MongoDB Documentation](https://docs.mongodb.com/)
  - NoSQL database for scalable, high-performance applications.

- **JWT (JSON Web Tokens):** [JWT Introduction](https://jwt.io/introduction)
  - Standard for securely transmitting information.

- **Bcrypt:** [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
  - Library for hashing passwords.

- **Class Validator:** [Class Validator Documentation](https://github.com/typestack/class-validator)
  - Decorator-based form validation for classes.

- **RxJS:** [RxJS Documentation](https://rxjs.dev/guide/overview)
  - Library for reactive programming.

### Project Structure:

- **Modules:**
  - `AuthModule`: Handles authentication-related functionalities.
  - `NoteModule`: Manages CRUD operations for notes.


    **Explanation:**
        In each module, a structured approach is followed to organize and manage the different components of the application. The implementation is broken down into the following components:

    - **DTOs (Data Transfer Objects):** These objects define the structure of data that is exchanged between different layers of the application, ensuring a clear and standardized format for communication.

    - **Repositories:** Repositories are responsible for interacting with the database, executing CRUD (Create, Read, Update, Delete) operations on the entities. They act as an abstraction layer between the application and the database.

    - **Entities:** Entities represent the data structure stored in the database. They define the schema of the data and establish the relationships between different pieces of information.

    - **Controller:** Controllers handle incoming HTTP requests, interact with services, and manage the flow of data. They act as the entry point for the application, receiving requests and returning responses.

    - **Services:** Services contain the business logic of the application. They perform operations, implement functionalities, and interact with repositories to retrieve or persist data. The separation of concerns ensures a modular and maintainable codebase.

    This structured approach enhances code organization, scalability, and maintainability, allowing for easier collaboration among team members and facilitating the integration of new features.

- **Middleware:**
  - `AuthMiddleware`: This middleware is crucial for evaluating the validity of authentication tokens. When a request passes through this middleware, it checks the provided token's validity. In the event of a valid token, the middleware exposes the user id in the request for further processing by the `NoteModule`. However, if the token is invalid or missing, the middleware responds with a status code 403 (Forbidden). This HTTP status code indicates that the user does not have the necessary permissions to access the requested resource. The frontend is designed to handle this response, triggering a user session reset. This mechanism ensures that, in case of token-related issues, the user is prompted to log in again for a secure and controlled authentication process.

- **Database Schema:**

**NoteSchema:**
```typescript
@Schema()
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: true })
  completed: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;
}
```

**UserSchema:**
```typescript
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}
```

**Database Usage:**
The base of the application is built on a non-relational MongoDB database. Two entities are defined as schemas, representing the structure of data stored:

- **NoteSchema:** Defines the structure for notes, including title, content, status, completion, tags, creation date, and the author's reference.
  
- **UserSchema:** Represents the structure for user data, including a unique username and a password.
