const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Extract `id` from query parameters
        const { id } = req.query;

        // API URLs
        const apiUrls = {
            users: 'https://jsonplaceholder.typicode.com/users',
            posts: 'https://jsonplaceholder.typicode.com/posts',
            comments: 'https://jsonplaceholder.typicode.com/comments',
        };

        // Fetch data from APIs
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            axios.get(apiUrls.users),
            axios.get(apiUrls.posts),
            axios.get(apiUrls.comments),
        ]);

        const users = usersResponse.data;
        const posts = postsResponse.data;
        const comments = commentsResponse.data;

        const maxId = Math.min(users.length, posts.length, comments.length);

        // If an `id` is provided, filter data for that specific ID
        if (id) {
            const idNumber = parseInt(id, 10);

            if (idNumber > maxId || idNumber <= 0) {
                return res.status(404).json({ message: `ID ${idNumber} not found` });
            }

            const result = {
                id: idNumber,
                name: users[idNumber - 1].name,
                title: posts[idNumber - 1].title,
                body: comments[idNumber - 1].body,
            };

            return res.status(200).json(result);
        }

        // If no `id` is provided, generate the CSV file
        const combinedData = Array.from({ length: maxId }, (_, i) => ({
            id: i + 1,
            content: `name: ${users[i].name}\ntitle: ${posts[i].title}\nbody: ${comments[i].body}\n`,
        }));

        // CSV Writer setup
        const csvFilePath = path.join(__dirname, '../csv/data.csv');
        const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: [
                { id: 'id', title: 'id' },
                { id: 'content', title: 'content' },
            ],
        });

        // Write data to CSV
        await csvWriter.writeRecords(combinedData);

        res.status(200).json({
            message: 'CSV file generated successfully',
            filePath: csvFilePath,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while generating the CSV file',
            error: error.message,
        });
    }
});

module.exports = router;
