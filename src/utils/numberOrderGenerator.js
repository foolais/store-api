const generateUniqueNumber = (lastNumber) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  let lastSequence = 1;
  let lastMonth = now.getMonth() + 1;
  let lastYear = now.getFullYear() % 100;

  if (lastNumber && lastNumber.length === 7) {
    lastSequence = +lastNumber.substring(0, 3);
    lastMonth = +lastNumber.substring(3, 5);
    lastYear = +lastNumber.substring(5, 7);
  }

  if (lastSequence === 1000) throw new Error('Sequence number maximum reached');

  if (currentMonth !== lastMonth || currentYear !== lastYear || lastNumber === null) {
    lastSequence = 1;
    lastMonth = currentMonth;
    lastYear = currentYear;
  } else {
    lastSequence += 1;
  }

  const sequenceNumber = String(lastSequence).padStart(3, '0');
  const month = String(lastMonth).padStart(2, '0');
  const year = String(lastYear).padStart(2, '0');

  return `${sequenceNumber}${month}${year}`;
};

module.exports = generateUniqueNumber;
