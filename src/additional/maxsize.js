// Require a file at/under a given size
// Usage: `{rules: {file: {maxsize: 5 * 1024 * 1024 /* 5MB */}}}`
$.validator.addMethod("maxsize", function(value, element, param) {
  // If the value is optional, return it
  var maxSize = param,
      optionalValue = this.optional(element),
      i, len, file;
  if (optionalValue) {
    return optionalValue;
  }

  // If the element is a file, then verify the size is at most what we expect
  if ($(element).attr("type") === "file") {
    // If we are in a browser that supports FileList, then check the files
    if (element.files && element.files.length) {
      i = 0;
      len = element.files.length;
      for (; i < len; i++) {
        file = element.files[i];
        // `file.size` is size in bytes
        if (file.size > maxSize) {
          return false;
        }
      }
    }
  }

  // Return success (either we don't have access to files due to older browser or files looked good)
  return true;
}, $.validator.format("Please submit a file that is under the maximum size."));
