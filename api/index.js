const express = require('express');
const generateCsvRoute = require('./routes/generateCsv');

const app = express();
const PORT = 3000;

// Route for generating CSV
app.use('/generate-csv', generateCsvRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
