# Coding Style Guide

This style is inspired by [Angular code style guide](https://angular.io/guide/styleguide)

When you encounter these words:

- **Consider**: you should _generally_ follow the guide. There're maybe exceptions, but please strive to be consistent.
- **Do**: you should _always_ follow the guide.
- **Avoid**: something you should almost never do.

For all rules that is not mentioned in the guide, use those defined by linters (`Prettier/ESLint`). That should be done automatically for you.

Feel free to propose new changes.

## General

**Consider**: One file per class/interface/component...

**Do**: Write small functions. A function should do one thing only.

**Consider**: Keep the number of funtion parameters small. If there are too many, create meaningful object to wrap them.

```typescript=
// Not recommended
function createUser(name: string,
                    age: number,
                    gender: string,
                    address: string,
                    phone: string): void {}

// OK
interface UserAttributes {
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

function createUser(attributes: UserAttributes): void {}
```

## Naming

### Symbols

**Do**: Use `PascalCase` for class/interface/type names. Even for abbreviate words.

```typescript=
// OK
class UserEntity {}
type LoginData = string | int;
interface ApiParams {}

// Bad
interface UserDTO {} // Should be UserDto
```

**Do**: Use `camelCase` for variables, functions

```typescript=
let userCount = 0;
const maxAge = 100;

function getUserAge() {}
```

**Do**: Append the symbol name with the conventional suffix (such as Module, Pipe, or Service) for a thing of that type.

### Files

**Do**: Separate file names with dots and dashes.
Use dashes to separate words in the descriptive name.
Use dots to separate the descriptive name from the type.
If there is no type, skip the dot.

| Symbol Name                | File Name              |
| -------------------------- | ---------------------- |
| `class AppModule`          | `app.module.ts`        |
| `class UsersRequestDto`    | `users-request.dto.ts` |
| `interface UserAttributes` | `user-attributes.ts`   |

### Database

**Do**: Use `camelCase` for attribute names.

**Do**: Use plural `snake_case` for table names.

```sql=
CREATE TABLE `user_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### Request/Response

**Do**: Use `pascalCase` whenever possible for request/response parameters.

## TypeScript

**Do**: Declare function return type.

```typescript=
// Bad
function getName() {
  return this.name;
}

// OK
function getName(): string {
  return this.name;
}
```

**Consider**: Declare variable type if it improves code reading.
