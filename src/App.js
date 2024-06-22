import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SurveyForm = () => {
  // State variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [surveyTopic, setSurveyTopic] = useState('');
  const [favoriteLanguage, setFavoriteLanguage] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [feedback, setFeedback] = useState('');
  
  // Additional questions fetched from API based on survey topic
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  
  // Validation errors state
  const [errors, setErrors] = useState({});

  // Mock API endpoint for additional questions based on survey topic
  const fetchAdditionalQuestions = async (topic) => {
    // Simulating API fetch
    switch (topic) {
      case 'Technology':
        setAdditionalQuestions([
          { id: 1, question: 'Favorite IDE?' },
          { id: 2, question: 'Open source contributions?' }
        ]);
        break;
      case 'Health':
        setAdditionalQuestions([
          { id: 1, question: 'Daily water intake?' },
          { id: 2, question: 'Hours of sleep per night?' }
        ]);
        break;
      case 'Education':
        setAdditionalQuestions([
          { id: 1, question: 'Current GPA?' },
          { id: 2, question: 'Extracurricular activities?' }
        ]);
        break;
      default:
        setAdditionalQuestions([]);
    }
  };

  useEffect(() => {
    if (surveyTopic) {
      fetchAdditionalQuestions(surveyTopic);
    }
  }, [surveyTopic]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';

    if (surveyTopic === 'Technology') {
      if (!favoriteLanguage) newErrors.favoriteLanguage = 'Favorite Programming Language is required';
      if (!yearsOfExperience || yearsOfExperience <= 0) {
        newErrors.yearsOfExperience = 'Years of Experience is required and must be greater than 0';
      }
    }

    if (surveyTopic === 'Health') {
      if (!exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }

    if (surveyTopic === 'Education') {
      if (!highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!feedback || feedback.length < 50) {
      newErrors.feedback = 'Feedback is required and must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare and display the summary message
      let message = `Survey Form Summary\n`;
      message += `Full Name: ${fullName}\n`;
      message += `Email: ${email}\n`;
      message += `Survey Topic: ${surveyTopic}\n`;

      switch (surveyTopic) {
        case 'Technology':
          message += `Favorite Programming Language: ${favoriteLanguage}\n`;
          message += `Years of Experience: ${yearsOfExperience}\n`;
          break;
        case 'Health':
          message += `Exercise Frequency: ${exerciseFrequency}\n`;
          message += `Diet Preference: ${dietPreference}\n`;
          break;
        case 'Education':
          message += `Highest Qualification: ${highestQualification}\n`;
          message += `Field of Study: ${fieldOfStudy}\n`;
          break;
        default:
          break;
      }

      message += `Feedback: ${feedback}`;

      // Display the summary message (in production, you might want to send this data to a server)
      alert(message);
    } else {
      // Scroll to top of the form to show errors
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <center>
            <h3>Survey Form</h3>
            <p>Build a survey form with dynamic fields and integration with an external API</p>
          </center>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName">Full Name<span style={{ color: 'red' }}>*</span></label>
              <input type="text" id="fullName" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} value={fullName} onChange={(e) => setFullName(e.target.value)} />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email<span style={{ color: 'red' }}>*</span></label>
              <input type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="surveyTopic">Survey Topic<span style={{ color: 'red' }}>*</span></label>
              <select id="surveyTopic" className={`form-select ${errors.surveyTopic ? 'is-invalid' : ''}`} value={surveyTopic} onChange={(e) => setSurveyTopic(e.target.value)}>
                <option value="">Select...</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
              {errors.surveyTopic && <div className="invalid-feedback">{errors.surveyTopic}</div>}
            </div>
            {surveyTopic === 'Technology' && (
              <>
                <div className="mb-3">
                  <label htmlFor="favoriteLanguage">Favorite Programming Language<span style={{ color: 'red' }}>*</span></label>
                  <select id="favoriteLanguage" className={`form-select ${errors.favoriteLanguage ? 'is-invalid' : ''}`} value={favoriteLanguage} onChange={(e) => setFavoriteLanguage(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                  </select>
                  {errors.favoriteLanguage && <div className="invalid-feedback">{errors.favoriteLanguage}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="yearsOfExperience">Years of Experience<span style={{ color: 'red' }}>*</span></label>
                  <input type="number" id="yearsOfExperience" className={`form-control ${errors.yearsOfExperience ? 'is-invalid' : ''}`} value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
                  {errors.yearsOfExperience && <div className="invalid-feedback">{errors.yearsOfExperience}</div>}
                </div>
              </>
            )}
            {surveyTopic === 'Health' && (
              <>
                <div className="mb-3">
                  <label htmlFor="exerciseFrequency">Exercise Frequency<span style={{ color: 'red' }}>*</span></label>
                  <select id="exerciseFrequency" className={`form-select ${errors.exerciseFrequency ? 'is-invalid' : ''}`} value={exerciseFrequency} onChange={(e) => setExerciseFrequency(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Rarely">Rarely</option>
                  </select>
                  {errors.exerciseFrequency && <div className="invalid-feedback">{errors.exerciseFrequency}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="dietPreference">Diet Preference<span style={{ color: 'red' }}>*</span></label>
                  <select id="dietPreference" className={`form-select ${errors.dietPreference ? 'is-invalid' : ''}`} value={dietPreference} onChange={(e) => setDietPreference(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                  {errors.dietPreference && <div className="invalid-feedback">{errors.dietPreference}</div>}
                </div>
              </>
            )}
            {surveyTopic === 'Education' && (
              <>
                <div className="mb-3">
                  <label htmlFor="highestQualification">Highest Qualification<span style={{ color: 'red' }}>*</span></label>
                  <select id="highestQualification" className={`form-select ${errors.highestQualification ? 'is-invalid' : ''}`} value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                  </select>
                  {errors.highestQualification && <div className="invalid-feedback">{errors.highestQualification}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="fieldOfStudy">Field of Study<span style={{ color: 'red' }}>*</span></label>
                  <input type="text" id="fieldOfStudy" className={`form-control ${errors.fieldOfStudy ? 'is-invalid' : ''}`} value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
                  {errors.fieldOfStudy && <div className="invalid-feedback">{errors.fieldOfStudy}</div>}
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="feedback">Feedback<span style={{ color: 'red' }}>*</span></label>
              <textarea id="feedback" className={`form-control ${errors.feedback ? 'is-invalid' : ''}`} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
              {errors.feedback && <div className="invalid-feedback">{errors.feedback}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default SurveyForm;
