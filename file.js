export function saveJsonFile(filePath, data) {
  saveTextFile(filePath, JSON.stringify(data));
}

export function loadJsonFile() {
  return new Promise((resolve) => {
    loadTextFile(filePath).then((text) => resolve(JSON.parse(text)));
  });
}

export function saveTextFile(filePath, text) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filePath;
  link.click();

  setTimeout(function() {
    URL.revokeObjectURL(url);
  }, 0);
}

export function loadTextFile() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsText(file);
    };

    input.click();
  });
}
