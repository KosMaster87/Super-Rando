import {
  showSuccessNotification,
  showErrorNotification,
} from "./notification.js";

/**
 * Sets up event handlers for the contact form and captcha refresh button.
 */
export const setupContactFormHandler = () => {
  const form = document.getElementById("contactForm");
  const refreshBtn = document.getElementById("refreshCaptcha");

  if (!form) return;

  form.addEventListener("submit", handleContactFormSubmit);

  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshCaptcha);
  }
};

/**
 * Handles contact form submission.
 * @param {Event} event - Submit event
 */
const handleContactFormSubmit = async (event) => {
  event.preventDefault();

  if (!validateCaptcha()) return;

  const submitBtn = getSubmitButton(event.target);
  const originalText = submitBtn.textContent;

  setLoadingState(submitBtn);

  try {
    const result = await submitFormData(event.target);
    handleSubmissionResult(result, event.target);
  } catch (error) {
    showErrorNotification("Error sending message");
    refreshCaptcha();
  } finally {
    resetButtonState(submitBtn, originalText);
  }
};

/**
 * Validates the captcha answer.
 * @returns {boolean} Is captcha valid
 */
const validateCaptcha = () => {
  const captchaInput = document.getElementById("captchaAnswer");
  const userAnswer = parseInt(captchaInput.value);
  const correctAnswer = parseInt(
    captchaInput.getAttribute("data-correct-answer")
  );

  if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
    showErrorNotification("The answer to the security question is incorrect.");
    refreshCaptcha();
    return false;
  }
  return true;
};

/**
 * Gets the submit button from form.
 * @param {HTMLFormElement} form - Form element
 * @returns {HTMLButtonElement} Submit button
 */
const getSubmitButton = (form) => {
  return form.querySelector(".contact-submit-btn");
};

/**
 * Sets the loading state for submit button.
 * @param {HTMLButtonElement} button - Submit button
 */
const setLoadingState = (button) => {
  button.disabled = true;
  button.textContent = "Sending...";
};

/**
 * Resets the button to original state.
 * @param {HTMLButtonElement} button - Submit button
 * @param {string} originalText - Original button text
 */
const resetButtonState = (button, originalText) => {
  button.disabled = false;
  button.textContent = originalText;
};

/**
 * Submits form data to backend.
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} Response result
 */
const submitFormData = async (form) => {
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    captcha: parseInt(document.getElementById("captchaAnswer").value),
  };

  const response = await fetch("/api/contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await parseResponse(response);
};

/**
 * Handles the submission result.
 * @param {Object} result - Response result
 * @param {HTMLFormElement} form - Form element
 */
const handleSubmissionResult = (result, form) => {
  if (result.success) {
    showSuccessNotification(
      "Thank you for your message! You will receive a confirmation email and we will get back to you soon."
    );
    form.reset();
    refreshCaptcha();
  } else {
    showErrorNotification(result.message || "Error sending message.");
    refreshCaptcha();
  }
};

/**
 * Parses the response as JSON with fallback to text.
 * @param {Response} response - Fetch response
 * @returns {Object} Parsed data or error info
 */
const parseResponse = async (response) => {
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();
    return {
      success: false,
      message: `Server returned non-JSON response: ${response.status}`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Response parsing failed: ${error.message}`,
    };
  }
};

/**
 * Refreshes the captcha question and answer.
 */
export const refreshCaptcha = () => {
  const captcha = generateCaptcha();
  const label = document.querySelector(".captcha-group label");
  const input = document.getElementById("captchaAnswer");

  if (label && input) {
    label.textContent = `Security question: What is ${captcha.question}? *`;
    input.setAttribute("data-correct-answer", captcha.answer);
    input.value = "";
  }
};

/**
 * Generates a simple math captcha.
 * @returns {Object} Captcha data with question and answer
 */
export const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let answer;
  let question;

  switch (operation) {
    case "+":
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
      break;
    case "-":
      answer = Math.max(num1, num2) - Math.min(num1, num2);
      question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
      break;
    case "*":
      answer = num1 * num2;
      question = `${num1} × ${num2}`;
      break;
  }

  return { question, answer };
};
