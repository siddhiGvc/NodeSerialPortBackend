const { SerialPort } = require('serialport');
const Max = 102;
const Min = 98;

// Function to initialize communication with a port
function initializePort(portInfo) {
    if (portInfo.path.includes("USB")) {
        console.log('Port path:', portInfo.path);
        const port = new SerialPort(portInfo.path, {
            baudRate: 1200
        });

        // Listen for data
        port.on('data', data => {
            console.log('Received data:', data.toString());
        });

        // Handle errors
        port.on('error', err => {
            console.error('Error:', err);
        });

        // Return the port instance
        return port;
    }
}

// List serial ports
SerialPort.list().then(ports => {
    ports.forEach(portInfo => {
        const port = initializePort(portInfo);
        if (port) {
            // Example: Send data to the port every 2 seconds
            let count = Min;
            const interval = setInterval(() => {
                const query = `*Q${count}#`;
                console.log('Sending:', query);
                port.write(query, err => {
                    if (err) {
                        console.error('Error writing to port:', err);
                    }
                });
                count++;
                
                if (count > Max) count = Min;
            }, 2000);

            // Example: Close the port after 30 seconds
            setTimeout(() => {
                clearInterval(interval);
                port.close(err => {
                    if (err) {
                        console.error('Error closing port:', err);
                    }
                });
            }, 30000);
        }
    });
}).catch(err => {
    console.error('Error listing serial ports:', err);
});
