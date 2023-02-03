import { FormEvent, useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextField, Typography, Button, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { Box } from '@mui/system';

const createStudent = async (data: { firstName: string, lastName: string, dateOfBirth: number }) => {
  const res = await fetch('http://localhost:8080/api/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  return json;
}

export default function Students() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs());
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:8080/api/students')
    const json = await res.json();
  
    setStudents(json);
    return json;
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('')

    // Validate inputs
    if (!firstName || !lastName || !dateOfBirth) {
      setValidationError('All fields required');
      return
    }

    const timeDiffMS = Date.now() - dateOfBirth.valueOf();
    const diffDate = new Date(timeDiffMS);
    const age = Math.abs(diffDate.getUTCFullYear() - 1970); // not perfect age calculation, ignores leap years

    // Must be >= 10 yrs old
    if (age < 10) {
      setValidationError('Student must be at least 10 years old');
      return;
    }

    await createStudent({ firstName, lastName, dateOfBirth: dateOfBirth.valueOf() });
    setSuccessMessage('Student added')
    setFirstName('')
    setLastName('')
    setDateOfBirth(dayjs())
    fetchStudents();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '50px', width: '40%' }}>
          <Typography variant="h5">Create New Student</Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '250px',
              width: '200px',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <TextField
              required
              id="firstName"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              required
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dateOfBirth}
                onChange={newValue => setDateOfBirth(newValue)}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
          {successMessage || <div>{successMessage}</div>}
          {validationError || <div>{validationError}</div>}
        </Box>

        <Box sx={{ width: '60%', mt: '50px', ml: '100px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {students?.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.first_name}</TableCell>
                    <TableCell>{student.last_name}</TableCell>
                    <TableCell>{dayjs(student.date_of_birth).format('MM/DD/YYYY')}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}
