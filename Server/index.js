const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3910;

app.use(bodyParser.json());
app.use(cors());
// Sample login credentials for demonstration purposes
const validCredentials = {
     email: 'jadavvijay0@gmail.com',
     mobile: "9725510022",
     password: '12345'
};
const registeredStudents = [
     {
          _id: 0,
          firstName: 'Vijay',
          lastName: 'Jadav',
          dob: '1995-12-06',
          email: 'jadavvijay0@gmail.com',
          phoneNumber: '9725510022',
          state: 'Gujarat',
          city: 'Surat',
          pincode: '395010',
          password: '123456',
          profileImage: 'https://example.com/profiles/john_doe.jpg'
     },
     {
          _id: 1,
          firstName: 'John',
          lastName: 'Doe',
          dob: '1995-08-25',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          state: 'Gujarat',
          city: 'Surat',
          pincode: '123456',
          password: 'mypassword123',
          profileImage: 'https://example.com/profiles/john_doe.jpg'
     },
     {
          _id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          dob: '1998-03-15',
          email: 'jane.smith@example.com',
          phoneNumber: '9876543210',
          state: 'Gujarat',
          city: 'Surat',
          pincode: '654321',
          password: 'password123',
          profileImage: 'https://example.com/profiles/jane_smith.jpg'
     },
     {
          _id: 3,
          firstName: 'Michael',
          lastName: 'Johnson',
          dob: '1993-12-01',
          email: 'michael.johnson@example.com',
          phoneNumber: '5678901234',
          state: 'Gujarat',
          city: 'Surat',
          pincode: '789012',
          password: 'securepassword',
          profileImage: 'https://example.com/profiles/michael_johnson.jpg'
     },
     // Add more student objects as needed
];


// Login endpoint
app.post('/login', (req, res) => {
     const { emailOrMobile, password } = req.body;
     if (emailOrMobile === validCredentials.email || emailOrMobile == validCredentials.mobile) {
          if (password === validCredentials.password) {
               res.status(200).json({ message: 'Login successful' });
               res.end()
          }
          res.status(401).json({ error: 'Invalid credentials' });
          res.end()
     }
     res.status(401).json({ error: 'Invalid credentials' });
     res.end()
});

app.post('/registerStudent', (req, res) => {
     let newStudent = req.body;
     newStudent._id = registeredStudents.length + 1
     registeredStudents.push(newStudent);
     res.json({ message: 'Student registered successfully!' });
});

app.post('/checkDuplicate', (req, res) => {
     const { field, value } = req.body;
     const existingStudent = registeredStudents.find(student => student[field] === value);

     if (existingStudent) {
          return res.json({ duplicate: true });
     }
     res.json({ duplicate: false });
});
app.get('/students', (req, res) => {
     res.json(registeredStudents);
});


app.get('/students/:id', (req, res) => {
     const studentId = parseInt(req.params.id);
     const student = registeredStudents.find((student) => student._id === studentId);

     if (student) {
          res.json(student);
     } else {
          res.status(404).json({ message: 'Student not found' });
     }
});

app.patch('/students/:id', (req, res) => {
     const studentId = parseInt(req.params.id);
     const updatedData = req.body;
     const student = registeredStudents.find((student) => student._id === studentId);
     if (student) {
          // Apply the updated data to the existing student object
          for (const key in updatedData) {
               if (updatedData.hasOwnProperty(key)) {
                    student[key] = updatedData[key];
               }
          }
          res.json({ message: 'Student updated successfully', student });
     } else {
          res.status(404).json({ message: 'Student not found' });
     }
});
app.delete('/students/:id', (req, res) => {
     const studentId = parseInt(req.params.id);
     const studentIndex = registeredStudents.findIndex((student) => student._id === studentId);

     if (studentIndex !== -1) {
          registeredStudents.splice(studentIndex, 1);
          res.json({ message: 'Student deleted successfully' });
     } else {
          res.status(404).json({ message: 'Student not found' });
     }
});

app.listen(port, () => {
     console.log(`Server running on http://localhost:${port}`);
});
