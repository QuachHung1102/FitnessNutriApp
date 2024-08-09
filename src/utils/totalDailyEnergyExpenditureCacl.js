const { useMemo } = require('react');

function calculateTDEE(weight, height, age, gender, activityLevel) {
  let bmr;

  // Tính BMR (Basal Metabolic Rate)
  if (gender === 'Nam') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'Nữ') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    throw new Error('Invalid gender');
  }

  // Tính TDEE dựa trên mức độ hoạt động
  let tdee;
  switch (activityLevel) {
    case 'sedentary':
      tdee = bmr * 1.2;
      break;
    case 'lightly active':
      tdee = bmr * 1.375;
      break;
    case 'moderately active':
      tdee = bmr * 1.55;
      break;
    case 'very active':
      tdee = bmr * 1.725;
      break;
    case 'extra active':
      tdee = bmr * 1.9;
      break;
    default:
      throw new Error('Invalid activity level');
  }

  return tdee;
}

const totalDailyEnergyExpenditureCacl = (
  weight,
  weightGoal,
  height,
  age,
  gender,
  time,
  activityLevel = 'very active',
) => {
  const timeNumber = parseFloat(time.split(' ', [1]));
  const tdee = calculateTDEE(weight, height, age, gender, activityLevel);
  const calorieAdjustment = ((weightGoal - weight) * 7700) / (timeNumber * 30);
  const dailyCalorieIntake = tdee + calorieAdjustment;
  return dailyCalorieIntake.toFixed(2);
};



module.exports = { totalDailyEnergyExpenditureCacl };