// ===== CHALLENGE NOTES =====
// ***********
// CHALLENGE:
// ***********
// Add all the code necessary to talk to Claude, asking it to describe the image. Figure out what the system prompt and the user prompt will be. When you get back the description in the response, display it in the UI.

// ===== IMPORTS & EXTERNAL DEPENDENCIES =====
/* ⚠️ POTENTIAL CRASH POINT: These imports require external packages and API setup */
/* import Anthropic from '@anthropic-ai/sdk' */
/* import { fetchImageAndReturnBase64ImageData } from '/utils/fetchImageAndReturnBase64ImageData' */

// ===== API CONFIGURATION =====
/* ⚠️ POTENTIAL CRASH POINT: Requires valid API key and proper environment setup */
/*
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // Must be set in environment variables
    baseURL: 'https://apis.scrimba.com/api.anthropic.com/' // Custom proxy URL
})
*/

// ===== CONSTANTS AND VARIABLES =====
const feedbackDisplayTime = 3000
let imageUrl    // Stores the uploaded image data URL
let imageType   // Stores the image MIME type

// ===== DOM ELEMENT SELECTORS =====
// Input and upload elements
const imageInputArea = document.getElementById('image-input-area')
const fileInput = document.getElementById('file-input')

// Description length controls
const descriptionLengthContainer = document.getElementById('description-length-container')
const descriptionLengthInput = document.getElementById('description-length-input')
const descriptionLengthText = document.getElementById('description-length-text')

// Action buttons
const describeButton = document.getElementById('describe-button')
const copyButton = document.getElementById('copy-button')
const clearButton = document.getElementById('clear-button')
const dismissErrorButton = document.getElementById('dismiss-error-button')

// Output sections and state management
const descriptionContent = document.getElementById('description-content')
const descriptionOutputArea = document.getElementById('description-output-area')
const loadingSection = document.getElementById('loading-section')
const errorSection = document.getElementById('error-section')
const errorMessage = document.getElementById('error-message')

// ===== EVENT LISTENERS SETUP =====
// Button interactions
describeButton.addEventListener('click', describe)
copyButton.addEventListener('click', copy)
clearButton.addEventListener('click', clear)
dismissErrorButton.addEventListener('click', dismissError)

// Image upload interactions (drag & drop + click)
imageInputArea.addEventListener('dragover', dragOverImageInputArea)
imageInputArea.addEventListener('dragleave', dragLeaveImageInputArea)
imageInputArea.addEventListener('drop', dropImage)
fileInput.addEventListener('change', displayUploadedImage)
imageInputArea.addEventListener('click', clickFileInput)

// App lifecycle and UI updates
document.addEventListener('DOMContentLoaded', focusOnImageInputArea)
const imageInputListener = listenForInnerHTMLChange(imageInputArea, enableControls)
window.addEventListener('beforeunload', cleanUp)
descriptionLengthInput.addEventListener('input', updateDescriptionLengthText)

// ===== MAIN BUTTON EVENT HANDLERS =====

// ⚠️ POTENTIAL CRASH POINT: Main API call function - requires working Anthropic API
async function describe() {
  /* 
  ⚠️ ENTIRE FUNCTION COMMENTED OUT - WILL CRASH WITHOUT PROPER API SETUP
  
  // ***********
  // CHALLENGE:
  // ***********
  // Handle errors.

  // ***********
  // CHALLENGE:
  // ***********
  // Debug the error and fix it.

  try {
      // Show loading state
      startLoading()
      
      // ⚠️ POTENTIAL CRASH POINT: External utility function for image processing
      const base64ImageData = await fetchImageAndReturnBase64ImageData(imageUrl)
      const descriptionLength = descriptionLengthInput.value
      
      // ⚠️ POTENTIAL CRASH POINT: Anthropic API call - requires valid API key and network connection
      const response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 300,
          system: 'You are an image describer. When asked to describe an image, provide an accurate description.',
          messages: [
              {
                  role: 'user',
                  content: [
                      {
                          type: 'image',
                          source: {
                              type: 'base64',
                              media_type: imageType,
                              data: base64ImageData
                          }
                      },
                      {
                          type: 'text',
                          // ***********
                          // CHALLENGE:
                          // ***********
                          // Practice prompt engineering. Modify the user prompt to adjust the length of the description. Where do you get the description length from?
                          text: `Describe the image. Limit the description to ${descriptionLength} words.`
                      }
                  ]
              }
          ]
      })
      
      // Handle successful response
      endLoading()
      descriptionOutputArea.value = response.content[0].text
      enableDescriptionOutputArea()
      enableCopyButton()
      focusOnCopyButton()
  } catch (error) {
      handleError(error)
  }
  */

  // TEMPORARY PLACEHOLDER TO PREVENT CRASHES
  console.log('Describe function called - API not yet implemented')
  showCopyFeedback('API not implemented yet', 'failure')
}

// ⚠️ POTENTIAL CRASH POINT: Clipboard API - may not work in all browsers/contexts
async function copy() {
  /*
  ⚠️ CLIPBOARD API COMMENTED OUT - MAY NOT WORK IN ALL BROWSERS
  try {
      await navigator.clipboard.writeText(descriptionOutputArea.value)
      showCopyFeedback('😄 Copied', 'success')
  } catch (err) {
      showCopyFeedback('😔 Failed', 'failure')
  }
  */

  // TEMPORARY FALLBACK - BASIC COPY FUNCTIONALITY
  try {
    // Try to select and copy text manually as fallback
    descriptionOutputArea.select()
    document.execCommand('copy')
    showCopyFeedback('😄 Copied', 'success')
  } catch (err) {
    showCopyFeedback('😔 Failed', 'failure')
  }
}

// Reset app to initial state
function clear() {
  clearImageInputArea()
  clearFileInput()
  clearDescriptionOutputArea()
  enableImageInputArea()
  focusOnImageInputArea()
  disableAllControls()
}

// Handle error state dismissal
function dismissError() {
  hideErrorSection()
  displayDescriptionContent()
  clear()
}

// ===== IMAGE HANDLING EVENT HANDLERS =====

// Drag and drop functionality
function dragOverImageInputArea(e) {
  e.preventDefault()
  imageInputArea.classList.add('drag-over')
}

function dragLeaveImageInputArea() {
  imageInputArea.classList.remove('drag-over')
}

function dropImage(e) {
  e.preventDefault()
  imageInputArea.classList.remove('drag-over')
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => displayImage(e.target.result, file.type)
    reader.readAsDataURL(file)
  }
}

// Handle file input change (click to upload)
function displayUploadedImage(e) {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => displayImage(e.target.result, file.type)
    reader.readAsDataURL(file)
  }
}

// Trigger file input dialog
function clickFileInput() {
  fileInput.click()
}

// ===== OTHER EVENT HANDLERS =====

function focusOnImageInputArea() {
  imageInputArea.focus()
}

// Monitor image input area changes to enable/disable controls
function listenForInnerHTMLChange(button, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        callback()
      }
    })
  })
  const config = {
    childList: true,
    characterData: true,
    subtree: true
  }
  observer.observe(button, config)
  return observer
}

// Cleanup observers on page unload
function cleanUp() {
  imageInputListener.disconnect()
}

// Update slider label text
function updateDescriptionLengthText() {
  descriptionLengthText.textContent = `Description Length: ${descriptionLengthInput.value} Words`
}

// ===== HELPER FUNCTIONS =====

// Display uploaded image in the input area
function displayImage(url, type) {
  imageUrl = url
  imageType = type
  imageInputArea.innerHTML = `<img src="${url}" class="flex-column uploaded-img" alt="Uploaded image">`
}

// ===== UI STATE MANAGEMENT =====

// Disable all interactive controls
function disableAllControls() {
  disableDescriptionLengthContainer()
  disableDescriptionLengthInput()
  disableDescribeButton()
  disableDescriptionOutputArea()
  disbaleClearButton()
  disableCopyButton()
}

// Enable controls when image is uploaded
function enableControls() {
  if (!imageInputArea.innerHTML.includes('<p>')) {
    enableDescriptionLengthContainer()
    enableDescriptionLengthInput()
    enableDescribeButton()
    enableClearButton()
  } else {
    disableAllControls()
  }
}

// ===== LOADING STATE MANAGEMENT =====

function startLoading() {
  hideDescriptionContent()
  displayLoadingSection()
}

function endLoading() {
  hideLoadingSection()
  displayDescriptionContent()
}

// ===== ERROR HANDLING =====

function handleError(error) {
  endLoading()
  disableImageInputArea()
  disableAllControls()
  hideDescriptionContent()
  setErrorMessageText(`There was an error processing the image: ${error.message}`)
  displayErrorSection()
}

// ===== COPY FEEDBACK SYSTEM =====

function showCopyFeedback(message, status) {
  const feedbackClass = status === 'success' ? 'copied' : 'failed'
  addClassToCopyButton(feedbackClass)
  setCopyButtonText(message)
  setTimeout(() => {
    removeClassFromCopyButton(feedbackClass)
    setCopyButtonText('Copy')
  }, feedbackDisplayTime)
}

// ===== ELEMENT ENABLE FUNCTIONS =====

function enableImageInputArea() {
  imageInputArea.disabled = false
}

function enableDescriptionLengthContainer() {
  descriptionLengthContainer.classList.remove('disabled')
}

function enableDescriptionLengthInput() {
  descriptionLengthInput.disabled = false
}

function enableDescribeButton() {
  describeButton.disabled = false
}

function enableCopyButton() {
  copyButton.disabled = false
}

function enableClearButton() {
  clearButton.disabled = false
}

function enableDescriptionOutputArea() {
  descriptionOutputArea.disabled = false
}

// ===== ELEMENT DISABLE FUNCTIONS =====

function disableCopyButton() {
  copyButton.disabled = true
}

function disbaleClearButton() {
  clearButton.disabled = true
}

function disableDescriptionOutputArea() {
  descriptionOutputArea.disabled = true
}

function disableDescribeButton() {
  describeButton.disabled = true
}

function disableDescriptionLengthInput() {
  descriptionLengthInput.disabled = true
}

function disableDescriptionLengthContainer() {
  descriptionLengthContainer.classList.add('disabled')
}

function disableImageInputArea() {
  imageInputArea.disabled = true
}

// ===== UI CLEARING FUNCTIONS =====

function clearFileInput() {
  fileInput.value = ''
}

function clearImageInputArea() {
  imageInputArea.innerHTML = `<img class="upload-icon" src="images/upload.svg" alt="Upload image">
                    <p>Drop image here or click to upload</p>`
}

function clearDescriptionOutputArea() {
  descriptionOutputArea.value = ''
}

// ===== FOCUS MANAGEMENT =====

function focusOnCopyButton() {
  copyButton.focus()
}

// ===== SECTION DISPLAY FUNCTIONS =====

function displayDescriptionContent() {
  descriptionContent.style.display = 'flex'
}

function displayLoadingSection() {
  loadingSection.style.display = 'flex'
}

function displayErrorSection() {
  errorSection.style.display = 'flex'
}

// ===== SECTION HIDE FUNCTIONS =====

function hideLoadingSection() {
  loadingSection.style.display = 'none'
}

function hideErrorSection() {
  errorSection.style.display = 'none'
}

function hideDescriptionContent() {
  descriptionContent.style.display = 'none'
}

// ===== TEXT CONTENT SETTERS =====

function setErrorMessageText(text) {
  errorMessage.textContent = text
}

function setCopyButtonText(text) {
  copyButton.textContent = text
}

// ===== CSS CLASS MANAGEMENT =====

function removeClassFromCopyButton(className) {
  copyButton.classList.remove(className)
}

function addClassToCopyButton(className) {
  copyButton.classList.add(className)
}