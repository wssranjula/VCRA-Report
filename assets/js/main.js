// Global variables
let uploadCount = 1;
let photoUploadCount = 1;

// Utility functions
function handleFileSelect(event, imgElement, iconElement) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const imageURL = URL.createObjectURL(file);
    imgElement.src = imageURL;
    imgElement.style.display = "block";
    if (iconElement) {
      iconElement.style.display = "none";
    }
    imgElement.onload = function () {
      URL.revokeObjectURL(imgElement.src);
    };
  } else {
    alert("Please select a valid image file.");
  }
}
// Helper function to load image as Data URL
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous"); // To avoid CORS issues
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });
}

// Product Pictures functions
function addNewUpload() {
  uploadCount++;
  const container = document.getElementById("imageUploadContainer");

  const newCardContainer = document.createElement("div");
  newCardContainer.classList.add("card-container");
  newCardContainer.style.display = "flex";
  newCardContainer.style.flexDirection = "column";
  newCardContainer.style.alignItems = "center";
  newCardContainer.style.marginBottom = "20px";

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.width = "200px";
  newCard.style.height = "200px";
  newCard.style.border = "2px dashed #ccc";
  newCard.style.borderRadius = "10px";
  newCard.style.display = "flex";
  newCard.style.justifyContent = "center";
  newCard.style.alignItems = "center";
  newCard.style.cursor = "pointer";
  newCard.style.overflow = "hidden";

  const newImg = document.createElement("img");
  newImg.id = `image${uploadCount}`;
  newImg.alt = `Preview Image ${uploadCount}`;
  newImg.style.width = "100%";
  newImg.style.height = "100%";
  newImg.style.objectFit = "cover";
  newImg.style.display = "none";

  const imageIcon = document.createElement("i");
  imageIcon.classList.add("fas", "fa-image");
  imageIcon.style.fontSize = "48px";
  imageIcon.style.color = "#ccc";

  const newInput = document.createElement("input");
  newInput.type = "file";
  newInput.accept = "image/*";
  newInput.id = `input-file${uploadCount}`;
  newInput.style.display = "none";

  newCard.appendChild(imageIcon);
  newCard.appendChild(newImg);
  newCard.appendChild(newInput);

  const newCommentBox = document.createElement("textarea");
  newCommentBox.id = `comment${uploadCount}`;
  newCommentBox.placeholder = "Add a description of the product...";
  newCommentBox.style.width = "200px";
  newCommentBox.style.height = "80px";
  newCommentBox.style.marginTop = "10px";
  newCommentBox.style.padding = "5px";
  newCommentBox.style.border = "1px solid #ccc";
  newCommentBox.style.borderRadius = "5px";
  newCommentBox.style.resize = "vertical";

  newCardContainer.appendChild(newCard);
  newCardContainer.appendChild(newCommentBox);

  container.appendChild(newCardContainer);

  newCard.addEventListener("click", function () {
    newInput.click();
  });

  newInput.addEventListener("change", function (event) {
    handleFileSelect(event, newImg, imageIcon);
  });
}

function uploadImages() {
  // Implement image upload functionality here
  console.log("Uploading images...");
}

// Defect Pictures functions
function addNewPhotoUpload() {
  photoUploadCount++;
  const container = document.getElementById("photoUploadContainer");

  const newCardContainer = document.createElement("div");
  newCardContainer.classList.add("card-container");
  newCardContainer.style.display = "flex";
  newCardContainer.style.flexDirection = "column";
  newCardContainer.style.alignItems = "center";
  newCardContainer.style.marginBottom = "20px";

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.width = "200px";
  newCard.style.height = "200px";
  newCard.style.border = "2px dashed #ccc";
  newCard.style.borderRadius = "10px";
  newCard.style.display = "flex";
  newCard.style.justifyContent = "center";
  newCard.style.alignItems = "center";
  newCard.style.cursor = "pointer";
  newCard.style.overflow = "hidden";

  const newImg = document.createElement("img");
  newImg.id = `photo${photoUploadCount}`;
  newImg.alt = `Preview Photo ${photoUploadCount}`;
  newImg.style.width = "100%";
  newImg.style.height = "100%";
  newImg.style.objectFit = "cover";
  newImg.style.display = "none";

  const cameraIcon = document.createElement("i");
  cameraIcon.classList.add("fas", "fa-camera");
  cameraIcon.style.fontSize = "48px";
  cameraIcon.style.color = "#ccc";

  const newInput = document.createElement("input");
  newInput.type = "file";
  newInput.accept = "image/*";
  newInput.id = `input-photo${photoUploadCount}`;
  newInput.style.display = "none";

  newCard.appendChild(cameraIcon);
  newCard.appendChild(newImg);
  newCard.appendChild(newInput);

  const newCommentBox = document.createElement("textarea");
  newCommentBox.id = `photoComment${photoUploadCount}`;
  newCommentBox.placeholder = "Add a description of the defect...";
  newCommentBox.style.width = "200px";
  newCommentBox.style.height = "80px";
  newCommentBox.style.marginTop = "10px";
  newCommentBox.style.padding = "5px";
  newCommentBox.style.border = "1px solid #ccc";
  newCommentBox.style.borderRadius = "5px";
  newCommentBox.style.resize = "vertical";

  newCardContainer.appendChild(newCard);
  newCardContainer.appendChild(newCommentBox);

  container.appendChild(newCardContainer);

  newCard.addEventListener("click", function () {
    newInput.click();
  });

  newInput.addEventListener("change", function (event) {
    handleFileSelect(event, newImg, cameraIcon);
  });
}

function uploadPhotos() {
  // Implement photo upload functionality here
  console.log("Uploading photos...");
}

// PDF Generation
// PDF Generation
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Define colors
  const primaryColor = [0, 123, 255]; // Blue
  const secondaryColor = [108, 117, 125]; // Gray
  const lightBlueBackground = [235, 245, 255]; // Light blue for background

  function addSectionTitle(title) {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(title, margin, y);
    y += 10;
    
    // Add an underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  }

  function checkPageBreak(contentHeight) {
    if (y + contentHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      addPageHeader();
      addBackgroundColor();
      return true;
    }
    return false;
  }

  function addPageHeader() {
    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    doc.text("VCRA PRODUCT INSPECTION REPORT", pageWidth - margin, 10, { align: "right" });
    doc.line(margin, 15, pageWidth - margin, 15);
    y = 25;
  }
  function addBackgroundColor() {
    doc.setFillColor(...lightBlueBackground);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  }
    // Helper function to format date to USA format (MM/DD/YYYY)
    function formatDateUSA(dateString) {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  async function addTable(headers, rows, emptyHeaders = false) {
    return new Promise((resolve) => {
      if (!Array.isArray(rows) || rows.length === 0) {
        console.warn("No rows data provided for table. Headers:", headers);
        resolve();
        return;
      }

      let tableHeaders = emptyHeaders ? [] : headers;

      doc.autoTable({
        head: tableHeaders.length > 0 ? [tableHeaders] : undefined,
        body: rows,
        startY: y,
        theme: 'grid',
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: y, bottom: margin },
        didDrawPage: function (data) {
          addPageHeader();
        },
      });
      y = doc.lastAutoTable.finalY + 10;
      resolve();
    });
  }


  async function addImages(containerSelector, title) {
    // Always start a new page for image sections
    doc.addPage();
    y = margin;
    addPageHeader();
  
    addSectionTitle(title);
    const container = document.querySelector(containerSelector);
    const images = container.querySelectorAll('img');
    const comments = container.querySelectorAll('textarea');
    
    const maxWidth = (pageWidth - 3 * margin) / 2; // Width for each image (2 per row)
    const maxHeight = 120; // Maximum height for images
    const commentHeight = 20; // Estimated height for comments
    
    for (let i = 0; i < images.length; i += 4) {
      if (i > 0) { // Add a new page after every 4 images
        doc.addPage();
        y = margin;
        addPageHeader();
        addSectionTitle(title);
      }
      
      for (let j = 0; j < 4; j++) {
        if (i + j < images.length && images[i + j].src) {
          try {
            const img = images[i + j];
            const imgData = await getBase64Image(img);
            
            // Calculate dimensions to maintain aspect ratio
            let imgWidth = img.naturalWidth;
            let imgHeight = img.naturalHeight;
            const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
            imgWidth *= ratio;
            imgHeight *= ratio;
            
            const xOffset = (j % 2) * (maxWidth + margin);
            const yOffset = Math.floor(j / 2) * (maxHeight + commentHeight + 10);
            
            doc.addImage(imgData, 'JPEG', margin + xOffset, y + yOffset, imgWidth, imgHeight);
            
            // Add comment below the image
            const comment = comments[i + j].value;
            doc.setFontSize(8);
            doc.setTextColor(...secondaryColor);
            doc.text(comment, margin + xOffset, y + yOffset + imgHeight + 5, { 
              maxWidth: maxWidth,
              align: 'left'
            });
          } catch (error) {
            console.error('Error adding image to PDF:', error);
          }
        }
      }
      
      y += 2 * (maxHeight + commentHeight + 10); // Move to next section
    }
    
    y += 10; // Add some space after the images section
  }

  function getBase64Image(img) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
    });
  }

  function collectFormData(formId) {
    
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const formRows = [];
  
    formData.forEach((value, key) => {
      const inputElement = form.querySelector(`[name="${key}"]`);  // Get the input element
      const label = form.querySelector(`label[for="${key}"]`)?.innerText || key;
  
      // Check if the input is of type 'date'
      if (inputElement?.type === 'date' && value) {
        // Format the date value into DD-MM-YYYY
        value = formatDateDDMMYYYY(value);
      }
  
      formRows.push([label, value]);
    });
  
    return formRows;
  }
  
  function formatDateDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);  // Two digits for day
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Two digits for month
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  function addSignatureSection() {
    const signatureLineWidth = 80; // Width of the signature line
    const lineHeight = 15;
    
    // Add signature lines
    doc.setLineWidth(0.5);
    doc.setDrawColor(0); // Black color for signature lines
    
    // Auditor signature
    let signatureY = y + 30; // Adjust vertical position based on your layout
    let signatureX = margin;
    doc.line(signatureX, signatureY, signatureX + signatureLineWidth, signatureY); // Signature line
    doc.setFontSize(10);
    doc.text('Name & Signature of Auditor', signatureX, signatureY + lineHeight); // Label
    
    // Vendor/Representative signature
    signatureX = pageWidth - margin - signatureLineWidth; // Align on the right
    doc.line(signatureX, signatureY, signatureX + signatureLineWidth, signatureY); // Signature line
    doc.text('Name & Signature of Vendor', signatureX, signatureY + lineHeight, { align: 'center' });
    
    y = signatureY + lineHeight + 20; // Update y position for further content if needed
  }
  

  function collectTableData(tableSelector, skipHeader = true) {
    const table = document.querySelector(tableSelector);
    const tableRows = [];
    if (table) {
      const rows = table.getElementsByTagName("tr");
      for (let i = skipHeader ? 1 : 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const rowData = [];
        for (let j = 0; j < cells.length; j++) {
          const input = cells[j].querySelector("input");
          rowData.push(input ? input.value || "" : cells[j].innerText.trim());
        }
        tableRows.push(rowData);
      }
    } else {
      console.error(`Table element "${tableSelector}" not found.`);
    }
    return tableRows;
  }

  function collectTableData1(tableSelector, skipHeader = true) {
    const table = document.querySelector(tableSelector);
    const tableRows = [];
    
    if (table) {
      const rows = table.getElementsByTagName("tr");
      for (let i = skipHeader ? 1 : 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const rowData = [];
        let hasNonEmptyCell = false;
  
        for (let j = 0; j < cells.length; j++) {
          const input = cells[j].querySelector("input");
          let cellValue = input ? input.value.trim() : cells[j].innerText.trim();
  
          if (cellValue) {
            hasNonEmptyCell = true;
          }
  
          rowData.push(cellValue);
        }
  
        // Replace empty cells with "OK" if there are non-empty cells in the row
        if (hasNonEmptyCell) {
          for (let k = 0; k < rowData.length; k++) {
            if (!rowData[k]) {
              rowData[k] = "OK";
            }
          }
        }
  
        tableRows.push(rowData);
      }
    } else {
      console.error(`Table element "${tableSelector}" not found.`);
    }
    return tableRows;
  }




  function collectRadioData(containerSelector) {
    const container = document.querySelector(containerSelector);
    const rows = [];
    if (container) {
      const tableRows = container.querySelectorAll("tr");
      
      // Start from index 1 to skip the header row
      for (let i = 1; i < tableRows.length; i++) {
        const row = tableRows[i];
        const description = row.querySelector("td")?.textContent.trim();
        
        // Only process the row if there's a description (to avoid empty rows)
        if (description) {
          const confirm = row.querySelector('input[value="confirm"]')?.checked ? "X" : "";
          const notConfirm = row.querySelector('input[value="notConfirm"]')?.checked ? "X" : "";
          const na = row.querySelector('input[value="na"]')?.checked ? "X" : "";
          const comments = row.querySelector('input[type="text"]')?.value || "";
          rows.push([description, confirm, notConfirm, na, comments]);
        }
      }
    }
    return rows;
  }

  async function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  try {
    const formattedDate = formatDateDDMMYYYY(new Date());

    // Add cover page
    doc.setFillColor(255,255,255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFont("Constantia", "bold"); 
    doc.setFontSize(24);
    doc.text("VCRA PRODUCT", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });
    doc.text("INSPECTION REPORT", pageWidth / 2, pageHeight / 2 + 10, { align: "center" });
    doc.setFontSize(12);
    doc.text(formattedDate, pageWidth / 2, pageHeight - 30, { align: "center" });


    // Add logo
    const logoURL = "assets/img/VCRAlog.png";
    const logoImg = await loadImage(logoURL);
    const logoWidth = 100;
    const logoHeight = 40;
    doc.addImage(
      logoImg,
      "PNG",
      pageWidth / 2 - logoWidth / 2,
      pageHeight / 2 - 80,
      logoWidth,
      logoHeight
    );

    // Start content on new page
    doc.addPage();
    addBackgroundColor();
    addPageHeader();

     // Function to add a section with title and table
     async function addSection(title, headers, rows, emptyHeaders = false) {
      const contentHeight = (rows.length + 1) * 10 + 40; // Estimate height
      if (checkPageBreak(contentHeight)) {
        y += 10; // Add some space at the top of the new page
      }
      addSectionTitle(title);
      await addTable(headers, rows, emptyHeaders);
    }

    // Add sections
    await addSection("Inspection Form Details", [], collectFormData("inspectionForm"), true);
    await addSection("Production Order Number", ["Production Order Number", "Color", "Quantity"], collectTableData("#dynamicTable1"));
    await addSection("AQL and Sample Size", [], collectFormData("thirdform"), true);
    
    // Product Pictures always start on a new page
    await addImages("#imageUploadContainer", "Product Pictures");
    
    await addSection("Product Details Verification", ["Description", "Confirm", "Not Confirm", "N/A"], collectRadioData(".product-details-verification table"));
    await addSection("Measurement Verification Sheet", ["Point of Measure", "Size", "Tolerance", "Spec", "", "", ""], collectTableData1("#dynamicTable"));
    await addSection("Quality Check List On Material & Workmanship", ["Material & Workmanship Details", "Critical", "Major", "Minor"], collectTableData("#dynamicTable2"));
    await addSection("Appearance and Packing", ["Description", "Confirm", "Not Confirm", "N/A", "Comments"], collectRadioData("#form1111"));
    await addSection("Material", ["Description", "Confirm", "Not Confirm", "N/A", "Comments"], collectRadioData("#formmaterial"));
    await addSection("Accessories & Trims", ["Description", "Confirm", "Not Confirm", "N/A", "Comments"], collectRadioData("#accessories-trims-form"));
    
    // Defect Pictures always start on a new page
    await addImages("#photoUploadContainer", "Defect Pictures");

    // Inspection Result
    const inspectionResult = document.querySelector('.button-group input[type="radio"]:checked');
    const resultText = inspectionResult ? inspectionResult.parentElement.textContent.trim() : "No option selected";
    await addSection("Inspection Result", ["Inspection Result"], [[resultText]]);

    
    // Retrieve comment from textarea and add it to the PDF
    const comments = document.getElementById('resultcomment1qq')?.value || 'No comments provided';
    await addSection("Comments", ["Comment"], [[comments]]);


    y += 18; 

    const signatureLineWidth = 80; // Width of the signature line
    const lineHeight = 7; // Line height for text
    const spaceBetween = 5; // Space between the signature lines and the text

    // Auditor signature on the left
    let signatureY = y + spaceBetween; // Starting Y position for signatures
    let auditorX = margin; // Left margin for auditor's signature

    // Draw Auditor signature line and text
    doc.setDrawColor(0); // Black color for lines
    doc.setLineWidth(0.5);
    doc.line(auditorX, signatureY, auditorX + signatureLineWidth, signatureY); // Auditor signature line
    doc.setFontSize(8);
    doc.text('Name & Signature of Auditor', auditorX, signatureY + lineHeight); // Auditor label

    // Vendor/Representative signature on the right
    let vendorX = pageWidth - margin - signatureLineWidth; // Align Vendor signature to the right

    // Draw Vendor signature line
    doc.line(vendorX, signatureY, vendorX + signatureLineWidth, signatureY); // Vendor signature line

    // Draw the Vendor text below the signature line
    doc.text('Name & Signature of Vendor', vendorX, signatureY + lineHeight); // First line of text

    // Update y position for further content if needed
    y = signatureY + lineHeight + 30; // Adjust y for next section

    // Save the PDF
    doc.save("VCRA-Product-Inspection-Report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please check the console for details.");
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  const inputFile1 = document.getElementById("input-file1");
  const image1 = document.getElementById("image1");

  inputFile1.addEventListener("change", function (event) {
    handleFileSelect(event, image1);
  });

  const inputPhoto1 = document.getElementById("input-photo1");
  const photo1 = document.getElementById("photo1");

  inputPhoto1.addEventListener("change", function (event) {
    handleFileSelect(event, photo1);
  });
});
