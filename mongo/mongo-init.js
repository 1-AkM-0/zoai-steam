db.createUser({
  user: "username",
  pwd: "password",
  roles: [
    {
      role: "dbOwner",
      db: "zoai_db",
    },
  ],
});

db.createCollection("logs");
