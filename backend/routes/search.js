import { Router } from 'express';
import { connectToMongo } from '../mongo_connection.js';
import { ObjectId } from 'mongodb';

const router = Router();

//Checks if user can see salary
function canSeeSalary(role) {
  return role.includes('HR') || role.includes('Human Fesources');
}

//Places Resticted Tag Salary if user is not in HR
function getEmployeeData(employee, showSalary) {
  return {
    _id: employee._id,
    name: employee.name,
    job_role: employee.job_role,
    work_location: employee.work_location,
    phone_number: employee.phone_number,
    salary: showSalary ? employee.salary : 'Restricted',
  };
}

//Assign Teirs 
function getTier(role = '') {
  const r = role.toLowerCase();
  if (r === 'ceo' || r.includes('chief') || r.includes('vp')) return 1;
  if (r.includes('director')) return 2;
  if (r.includes('manager')) return 3;
  if (r.includes('analyst') || r.includes('engineer')) return 4;
  return 5;
}

//Connect to Mongo
async function getEmployees() {
  const db = await connectToMongo();
  return db.collection('employees').find({}).toArray();
}

//Search Feature
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const employees = await getEmployees();

    const searchResults = employees.filter(emp =>
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.job_role.toLowerCase().includes(query.toLowerCase()) ||
      emp.work_location.toLowerCase().includes(query.toLowerCase())
    );

    const modifiedResults = searchResults.map(emp => {
      const canSee = canSeeSalary(emp.job_role);
      return getEmployeeData(emp, canSee);
    });

    res.json(modifiedResults);
  } catch (err) {
    console.error('Error during search:', err);
    res.status(500).json({ error: 'Error searching employees', details: err });
  }
});

router.get('/employee/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Employee ID is required' });
  }

  try {
    const employees = await getEmployees();
    const employee = employees.find(emp => emp._id.toString() === id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const salaryVisible = canSeeSalary(employee.job_role);
    const userTier = getTier(employee.job_role);
    const userLocation = employee.work_location;

    const manager = employees.find(emp => getTier(emp.job_role) < userTier && emp.work_location === userLocation);
    const directReports = employees.filter(emp => getTier(emp.job_role) > userTier && emp.work_location === userLocation && emp._id.toString() !== id);

    res.json({
      ...getEmployeeData(employee, salaryVisible),
      reportsTo: manager ? manager.name : null,
      directReports: directReports.map(e => getEmployeeData(e, salaryVisible)),
    });
  } catch (err) {
    console.error('Error fetching employee details:', err);
    res.status(500).json({ error: 'Error fetching employee details', details: err });
  }
});

export default router;
