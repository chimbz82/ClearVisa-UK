/**
 * Shared utility to trigger the browser's print dialog.
 * This allows users to save the current assessment as a PDF.
 */
export function triggerReportPdfDownload() {
  if (typeof window === "undefined") return;

  // Use the native print dialog - the industry standard for "Save as PDF" in web apps
  window.print();
}