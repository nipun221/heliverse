const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.ATLAS_STRING, {
  dbName: 'heliverse', // Use the correct database name
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the mockdata schema
const mockdataSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

// Create a Mongoose model based on the schema
const Mockdata = mongoose.model('mockdata', mockdataSchema);

// GET request to retrieve all users
app.get('/api/users', async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1; // Get the page number from query parameters, default to page 1
    const pageSize = 20; // Number of users per page

    const totalUsers = await Mockdata.countDocuments({});
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await Mockdata.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const numberOfUsers = users.length;

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const links = {
      self: `/api/users?page=${page}`,
      next: nextPage ? `/api/users?page=${nextPage}` : null,
      prev: prevPage ? `/api/users?page=${prevPage}` : null,
    };

    return response.status(200).json({
      numberOfUsers: numberOfUsers,
      totalPages: totalPages,
      currentPage: page,
      users: users,
      links: links,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});


// POST request to create a new user
app.post('/api/users', async (request, response) => {
  try {
    const users = await Mockdata.find({});
    const numberOfUsers = users.length;
    if (numberOfUsers > 0) {
      const lastUser = users[numberOfUsers - 1];
      request.body.id = lastUser.id + 1;
    } else {
      request.body.id = 1;
    }

    const newUser = {
      id: request.body.id,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      gender: request.body.gender,
      avatar: request.body.avatar,
      domain: request.body.domain,
      available: request.body.available,
    };

    const user = await Mockdata.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});

// GET request to retrieve a user by ID
app.get('/api/users/:id', async (request, response) => {
  try {
    const user = await Mockdata.findOne({ id: request.params.id });
    if (!user) {
      return response.status(404).send('User not found');
    }
    return response.status(200).send(user);
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});

// PUT request to update a user by ID
app.put('/api/users/:id', async (request, response) => {
  try {
    const user = await Mockdata.findOneAndUpdate(
      { id: request.params.id },
      request.body,
      { new: true }
    );
    if (!user) {
      return response.status(404).send('User not found');
    }
    return response.status(200).send(user);
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});

// DELETE request to delete a user by ID
app.delete('/api/users/:id', async (request, response) => {
  try {
    const user = await Mockdata.findOneAndDelete({ id: request.params.id });
    if (!user) {
      return response.status(404).send('User not found');
    }
    return response.status(200).send(user);
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});

// GET request to retrieve all users by domain
app.get('/api/users/domain/:domain', async (request, response) => {
  try {
    const domain = request.params.domain;
    const page = parseInt(request.query.page) || 1; // Get the page number from query parameters, default to page 1
    const pageSize = parseInt(request.query.pageSize) || 20; // Get the page size from query parameters, default to 20

    const query = {
      domain: domain,
    };

    const totalUsers = await Mockdata.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await Mockdata.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const numberOfUsers = users.length;

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const links = {
      self: `/api/users/domain/${domain}?page=${page}`,
      next: nextPage ? `/api/users/domain/${domain}?page=${nextPage}&pageSize=${pageSize}` : null,
      prev: prevPage ? `/api/users/domain/${domain}?page=${prevPage}&pageSize=${pageSize}` : null,
    };

    return response.status(200).json({
      numberOfUsers: numberOfUsers,
      totalPages: totalPages,
      currentPage: page,
      users: users,
      links: links,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});



// GET request to retrieve all users by availability
app.get('/api/users/available/:available', async (request, response) => {
  try {
    const available = request.params.available;
    const page = parseInt(request.query.page) || 1; // Get the page number from query parameters, default to page 1
    const pageSize = parseInt(request.query.pageSize) || 20; // Get the page size from query parameters, default to 20

    const query = {
      available: available,
    };

    const totalUsers = await Mockdata.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await Mockdata.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const numberOfUsers = users.length;

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const links = {
      self: `/api/users/available/${available}?page=${page}`,
      next: nextPage ? `/api/users/available/${available}?page=${nextPage}&pageSize=${pageSize}` : null,
      prev: prevPage ? `/api/users/available/${available}?page=${prevPage}&pageSize=${pageSize}` : null,
    };

    return response.status(200).json({
      numberOfUsers: numberOfUsers,
      totalPages: totalPages,
      currentPage: page,
      users: users,
      links: links,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});



// GET request to search users by string
app.get('/api/users/search/:string', async (request, response) => {
  try {
    const search = request.params.string || ''; // Use an empty string if no search word is provided
    const page = parseInt(request.query.page) || 1; // Get the page number from query parameters, default to page 1
    const pageSize = 20; // Number of users per page

    let query = {};
    if (search !== '') {
      query = {
        $or: [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { domain: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const totalUsers = await Mockdata.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await Mockdata.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const numberOfUsers = users.length;

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const links = {
      self: `/api/users/search/${search}?page=${page}`,
      next: nextPage ? `/api/users/search/${search}?page=${nextPage}` : null,
      prev: prevPage ? `/api/users/search/${search}?page=${prevPage}` : null,
    };

    return response.status(200).json({
      numberOfUsers: numberOfUsers,
      totalPages: totalPages,
      currentPage: page,
      users: users,
      links: links,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send('Internal Server Error');
  }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
