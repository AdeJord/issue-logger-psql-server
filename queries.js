const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ade",
  host: "localhost",
  database: "postgres",
  password: "12477560Ae",
  port: 5432,
});

// Am I?? Creating an instance of Pool, then supplying props?

const getIssues = (request, response) => {
  pool.query("SELECT * FROM issues ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getIssueById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM issues WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


// Ctreate issue works ok
const createIssue = (request, response) => {
  const { regNo, issue } = request.body;
  const result = regNo;
  const formattedRegNo = result.toString().toUpperCase().trim(" ");

  pool.query(
    "INSERT INTO issues (regNo, issue) VALUES ($1, $2) RETURNING *",
    [formattedRegNo, issue],
    (error, results) => {
      if (error) {
        console.error("Error creating issue:", error);
        response
          .status(500)
          .json({ error: "An error occurred while creating the issue." });
      }
      response.status(201).send(`Issue added with ID: ${results.rows[0].id}`);
    }
  );
};

//create user seems to be working but error 
const createUser = (request, response) => {
  const { username, password, confirmPassword, isValid, email } = request.body;
  // need to ask, is there already a user with this name, has this email address been used, and doo passwords match?

  pool.query(
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
    [username, password, email],
    (error, results) => {
      if (error) {
        console.error("Error creating user:", error);
        response
          .status(500)
          .json({ error: "An error occurred while creating the user." });
      }
      // console.log(results.rows[0].id)
      // Why does this come up with id undefined?  Because its not yet created?
      // response.status(201).send(`user added with ID: ${results.rows[0].id}`);
      else {
        const userId = results.rows[0].id;
        response
          .status(201)
          .json({ message: "User created successfully", userId });
      }
    }
  );
};

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      console.log('Error getting users')
      throw error;
    }
    response.status(200).json(results.rows);
    console.log('Users retrieved')
  });
};


const updateIssue = (request, response) => {
  const id = parseInt(request.params.id);
  const { regNo, issue } = request.body;

  pool.query(
    "UPDATE issues SET regNo = $1, issue = $2 WHERE id = $3",
    [regNo, issue, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Issue with ID: ${id} modifiedID`);
    }
  );
};

const deleteIssue = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM issues WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User with ID ${id} deleted!`);
  });
};

module.exports = {
  createUser,
  getIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
  getUsers
};
