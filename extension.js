class MyApiExtension {
    getInfo() {
        return {
            id: "myApiExtension",
            name: "My API Extension",
            blocks: [
                {
                    opcode: "getData",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Get data from API",
                },
                {
                    opcode: "sendData",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Send [DATA] to API",
                    arguments: {
                        DATA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "Hello API"
                        }
                    }
                }
            ]
        };
    }

    // Block Functions
    async getData() {
        try {
            const response = await fetch("https://your-api-url.com/data");
            const data = await response.json();
            return data.message; // Adjust based on your API's response
        } catch (error) {
            return "Error fetching data!";
        }
    }

    async sendData(args) {
        const { DATA } = args;
        try {
            const response = await fetch("https://your-api-url.com/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: DATA })
            });
            const result = await response.json();
            console.log("Data sent:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }
}

// Register the extension
Scratch.extensions.register(new MyApiExtension());
