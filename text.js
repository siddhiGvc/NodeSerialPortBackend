
const data="[0;32mI (8740771) main: *V:22222:3:5#";
const Data= data.toString();
const dataArray= Data.split("main:");
console.log(dataArray[1]);
const cleanedData = data.replace(/\x1B\[[0-9;]*[JKmsu]/g, '');
  if (cleanedData.includes('*') && cleanedData.includes('#')) {
    console.log(cleanedData);
    // fs.appendFileSync(`serial_${portInfo.path}.txt`, cleanedData + '\n');
  }
