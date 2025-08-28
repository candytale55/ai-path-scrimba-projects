// ===== IMPORTS & DEPENDENCIES =====
// TODO: Uncomment when implementing API functionality
// import Anthropic from '@anthropic-ai/sdk'

// ===== API INSTANCE =====
// TODO: Uncomment when implementing API functionality
// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
//   baseURL: 'https://apis.scrimba.com/api.anthropic.com/'
// })

// ===== CONSTANTS =====
const feedbackDisplayTime = 3000  // Duration for copy feedback display (3 seconds)

// ===== DOM ELEMENT SELECTORS =====
// Input section elements
const textInputArea = document.getElementById('text-input-area')
const summaryLengthContainer = document.getElementById('summary-length-container')
const summaryLengthInput = document.getElementById('summary-length-input')
const summaryLengthText = document.getElementById('summary-length-text')
const summarizeButton = document.getElementById('summarize-button')

// Output section elements
const summaryContent = document.getElementById('summary-content')
const summaryOutputArea = document.getElementById('summary-output-area')
const copyButton = document.getElementById('copy-button')
const clearButton = document.getElementById('clear-button')

// State management elements
const loadingSection = document.getElementById('loading-section')
const errorSection = document.getElementById('error-section')
const errorMessage = document.getElementById('error-message')
const dismissErrorButton = document.getElementById('dismiss-error-button')

// ===== EVENT LISTENERS SETUP =====
// Button event listeners
summarizeButton.addEventListener('click', summarize)
copyButton.addEventListener('click', copy)
clearButton.addEventListener('click', clear)
dismissErrorButton.addEventListener('click', dismissError)

// Other event listeners
document.addEventListener('DOMContentLoaded', focusOnTextInputArea)
textInputArea.addEventListener('input', scrollTextAreaToTopAndEnableControls)
summaryLengthInput.addEventListener('input', updateSummaryLengthText)

// ===== MAIN EVENT HANDLERS =====

// Summarize function - handles API call to generate summary
async function summarize() {
  // TODO: Uncomment when implementing API functionality
  // try {
  //   startLoading()
  //   const text = textInputArea.value
  //   const summaryLength = summaryLengthInput.value

  //   const response = await anthropic.messages.create({
  //     model: 'claude-3-5-sonnet-20240620',
  //     max_tokens: 300,
  //     system: 'You are a text summarizer. When asked to summarize a text, send back the summary of it. Please only send back the summary without prefixing it with things like "Summary" or telling where the text is from. Also give me the summary as if the original author wrote it and without using a third person voice.',
  //     messages: [
  //       {
  //         'role': 'user',
  //         'content': [
  //           {
  //             'type': 'text',
  //             'text': `Summarize this text. Limit the length to ${summaryLength} words: ${text}`
  //           }
  //         ]
  //       }
  //     ]
  //   })
  //   endLoading()
  //   summaryOutputArea.value = response.content[0].text

  //   enableSummayOutputArea()
  //   enableCopyButton()
  //   focusOnCopyButton()
  // } catch (error) {
  //   handleError(error)
  // }

  // TEMPORARY: Mock functionality for testing UI
  console.log('Summarize button clicked - API implementation needed')
}

// Copy summary to clipboard
async function copy() {
  try {
    await navigator.clipboard.writeText(summaryOutputArea.value)
    showCopyFeedback('😄 Copied', 'success')
  } catch (err) {
    showCopyFeedback('😔 Failed', 'failure')
  }
}

// Clear all inputs and reset UI state
function clear() {
  clearTextInputArea()
  clearSummaryOutputArea()
  enableTextInputArea()
  focusOnTextInputArea()
  disableAllControls()
}

// Dismiss error state and reset UI
function dismissError() {
  hideErrorSection()
  displaySummaryContent()
  clear()
}

// ===== INPUT EVENT HANDLERS =====

// Set focus to text input area on page load
function focusOnTextInputArea() {
  textInputArea.focus()
}

// Handle text input changes - scroll to top and enable/disable controls
function scrollTextAreaToTopAndEnableControls() {
  scrollTextAreaToTop()
  enableControls()
}

// Update the summary length display text
function updateSummaryLengthText() {
  summaryLengthText.textContent = `Summary Length: ${summaryLengthInput.value} Words`
}

// ===== HELPER FUNCTIONS =====

// UI State Management
function scrollTextAreaToTop() {
  setTimeout(() => {
    textInputArea.scrollTop = 0
  }, 0)
}

// Enable/disable controls based on input content
function enableControls() {
  if (textInputArea.value.trim() !== '') {
    enableSummaryLengthContainer()
    enableSummaryLengthInput()
    enableSummarizeButton()
    enableClearButton()
  } else {
    disableAllControls()
  }
}

// Disable all interactive controls
function disableAllControls() {
  disableSummaryLengthContainer()
  disableSummaryLengthInput()
  disableSummarizeButton()
  disableSummaryOutputArea()
  disbaleClearButton()
  disableCopyButton()
}

// ===== LOADING STATE MANAGEMENT =====

// Show loading state
function startLoading() {
  hideSummaryContent()
  displayLoadingSection()
}

// Hide loading state
function endLoading() {
  hideLoadingSection()
  displaySummaryContent()
}

// ===== ERROR HANDLING =====

// Handle API errors and display error state
function handleError(error) {
  endLoading()
  disableTextInputArea()
  disableAllControls()
  hideSummaryContent()
  setErrorMessageText(`There was an error processing the text: ${error.message}`)
  displayErrorSection()
}

// ===== COPY FEEDBACK SYSTEM =====

// Show temporary feedback for copy operation
function showCopyFeedback(message, status) {
  const feedbackClass = status === 'success' ? 'copied' : 'failed'
  addClassToCopyButton(feedbackClass)
  setCopyButtonText(message)
  setTimeout(() => {
    removeClassFromCopyButton(feedbackClass)
    setCopyButtonText('Copy')
  }, feedbackDisplayTime)
}

// ===== FOCUS MANAGEMENT =====

function focusOnCopyButton() {
  copyButton.focus()
}

// ===== DISPLAY STATE FUNCTIONS =====

// Show/hide different sections
function displaySummaryContent() {
  summaryContent.style.display = 'flex'
}

function displayLoadingSection() {
  loadingSection.style.display = 'flex'
}

function displayErrorSection() {
  errorSection.style.display = 'flex'
}

function hideLoadingSection() {
  loadingSection.style.display = 'none'
}

function hideErrorSection() {
  errorSection.style.display = 'none'
}

function hideSummaryContent() {
  summaryContent.style.display = 'none'
}

// ===== ENABLE FUNCTIONS =====

function enableTextInputArea() {
  textInputArea.disabled = false
}

function enableSummaryLengthContainer() {
  summaryLengthContainer.classList.remove('disabled')
}

function enableClearButton() {
  clearButton.disabled = false
}

function enableSummarizeButton() {
  summarizeButton.disabled = false
}

function enableSummaryLengthInput() {
  summaryLengthInput.disabled = false
}

function enableCopyButton() {
  copyButton.disabled = false
}

function enableSummayOutputArea() {
  summaryOutputArea.disabled = false
}

// ===== DISABLE FUNCTIONS =====

function disableCopyButton() {
  copyButton.disabled = true
}

function disbaleClearButton() {
  clearButton.disabled = true
}

function disableSummaryOutputArea() {
  summaryOutputArea.disabled = true
}

function disableSummarizeButton() {
  summarizeButton.disabled = true
}

function disableSummaryLengthInput() {
  summaryLengthInput.disabled = true
}

function disableSummaryLengthContainer() {
  summaryLengthContainer.classList.add('disabled')
}

function disableTextInputArea() {
  textInputArea.disabled = true
}

// ===== TEXT MANIPULATION FUNCTIONS =====

function setErrorMessageText(text) {
  errorMessage.textContent = text
}

function setCopyButtonText(text) {
  copyButton.textContent = text
}

function clearTextInputArea() {
  textInputArea.value = ''
}

function clearSummaryOutputArea() {
  summaryOutputArea.value = ''
}

// ===== CSS CLASS MANIPULATION =====

function removeClassFromCopyButton(className) {
  copyButton.classList.remove(className)
}

function addClassToCopyButton(className) {
  copyButton.classList.add(className)
}