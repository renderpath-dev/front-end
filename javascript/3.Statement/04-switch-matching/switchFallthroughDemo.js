// Goal:
// Use intentional fallthrough to share behavior.

const role = "admin";
const permissions = [];

switch (role) {
  case "admin":
    permissions.push("manage-users");
  case "editor":
    permissions.push("edit-content");
  case "viewer":
    permissions.push("view-content");
    break;
  default:
    permissions.push("no-access");
}

console.log(permissions);
