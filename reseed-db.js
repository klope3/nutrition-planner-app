import { writeFileSync } from "fs";

const data = {
  users: [
    {
      id: 1,
      email: "person@example.com",
      password: "password1234",
    },
  ],
};

writeFileSync("db.json", JSON.stringify(data), { encoding: "utf-8" });
