// Calculate progress for Student Card
export const calculateStudentProgress = (data) => {
  if (!data) return 0;
  
  const fields = [
    'idNum', 'studentEmployCode', 'webGroup', 'tuitionCode',
    'entranceYear', 'entranceTerm', 'currentClassCode',
    'numOfCourses', 'hoursEnrolled', 'termHoursEarned',
    'careerGpa', 'degreeCode', 'major1', 'minor1', 'concentration1'
  ];

  const filledFields = fields.filter(field => data[field] !== null && data[field] !== undefined && data[field] !== '');
  return Math.round((filledFields.length / fields.length) * 100);
};

// Calculate progress for Info Card
export const calculateInfoProgress = (data) => {
  if (!data) return 0;
  
  const fields = [
    'id_num', 'last_name', 'first_name', 'middle_name',
    'mobile_phone', 'email_address', 'appid',
    'name_format', 'birth_name', 'stud_mstr_employ'
  ];

  const filledFields = fields.filter(field => data[field] !== null && data[field] !== undefined && data[field] !== '');
  return Math.round((filledFields.length / fields.length) * 100);
};

// Calculate progress for Candidacy Card
export const calculateCandidacyProgress = (data) => {
  if (!data || data.length === 0) return 0;
  
  const currentRecord = data[0]; // Using the first record for progress calcul
  
  const fields = [
    'idNum', 'yearCode', 'divisionCode', 'stage', 'programCode', 'termCode',
    'hsOrgTypeAd', 'schoolType', 'clOrgTypeAd', 'clGpa', 'clTotalApCredits', 'clTotalInstCredits',
    'act', 'gat', 'gre', 'sat', 'satRc', 'satWc', 'tef', 'toepp',
    'birthDate', 'citizenOf', 'city', 'country', 'addressLine1', 'birthName',
    'firstName', 'lastName', 'emailAddress', 'gender', 'mobile',
    'fatherAddress', 'motherAddress', 'fatherPhone', 'motherPhone',
    'fatherOccupation', 'motherOccupation', 'appFeeDate', 'udef1a1'
  ];

  const filledFields = fields.filter(field => currentRecord[field] !== null && currentRecord[field] !== undefined && currentRecord[field] !== '');
  return Math.round((filledFields.length / fields.length) * 100);
}; 