    'use server';
    export async function fetchCategories() {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const response = await fetch('https://main.hivetech.space/api/category', {
                headers: {
                    "Content-Type": "application/json",
                    // Add any required headers here (e.g., Authorization)
                },
            })
            const data = await response.json();

        
        
        return data.data; 
        } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Re-throw the error if you want to handle it elsewhere
        }
    }