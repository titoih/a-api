
require('dotenv').config();
const books = require('google-books-search');
const Resource = require('../models/resource.model');

require('../configs/db.config');

const authors = ['Laura Norton'];

authors.forEach(author => {
  books.search(author, function(error, results) {
    if (!error) {
      results.forEach((book) => {
        Resource.create({
          title: book.title,
          description: book.description,
          imageURL: book.thumbnail,
          publishedDate: book.publishedDate,
          kind: 'Book'
        })
      })
    } else {
        console.error(error);
    }
  })
})
